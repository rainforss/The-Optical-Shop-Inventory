const nodemailer = require("nodemailer");
const mailer = require("../../utilities/mailer");
const crypto = require("crypto");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const validate = require("../../validation");
const verify = require("../../utilities/verifyToken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//Register
router.post("/register", async (req, res) => {
  //Validate data before making requests
  const { error } = validate.registerValidation(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res
      .status(400)
      .json({ msg: `User with email ${req.body.email} already exists` });
  }

  //Secure the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Only a list of invited users can register for the app
  if (
    req.body.email === process.env.ACCEPTED_EMAIL_1 ||
    req.body.email === process.env.ACCEPTED_EMAIL_2
  ) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      activationToken: hashedPassword + crypto.randomBytes(20).toString("hex"),
      tokenExpires: Date.now() + 24 * 3600 * 1000,
    });

    //Generate activation link to send
    const activationLink = `http://localhost:5000/api/user/activate/${encodeURIComponent(
      user.activationToken
    )}`;

    //Configure email
    const mailOptions = {
      to: req.body.email,
      html: `Please click the following link to <a href="${activationLink}">${activationLink}</a> to activate your account.`,
    };
    try {
      //Send user the activation link and save the user credentials to database
      mailer(mailOptions, res);
      const savedUser = await user.save();
      res.json({ msg: `The activation email has been sent to ${user._id}` });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  } else {
    res.status(400).json({ msg: "Only invited users can register" });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = validate.loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Email does not match an existing user" });

    if (!user.active)
      return res.status(400).json({
        msg:
          "Your account has not been activated, please activate using emailed link first",
      });

    //Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "Password does not match an active user" });

    //Create and assign a JSON token with expiration time of 2 hours
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 7200,
    });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Get current user information
router.get("/userinfo", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      res.status(400).json({ msg: "User does not exist" });
    }
    res.json(user);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

//Get Cloudinary signature and timestamp
router.post("/getsignature", verify, (req, res) => {
  try {
    const { public_id } = req.body;
    const timestamp = Math.floor(+new Date() / 1000);
    const signatureString = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");
    const authentication = { timestamp, signature };
    res.json(authentication);
  } catch (err) {
    res.json({ msg: err.message });
  }
});

//NEED TO IMPLEMENT A SPECIFIC ROUTE FOR SENDING ACTIVATION EMAIL IN THE FUTURE
//Activation link implementation
router.get("/activate/:activationToken", async (req, res) => {
  //Find the user who possesses the activation token which is within expiration date
  try {
    const user = await User.findOne({
      activationToken: decodeURIComponent(req.params.activationToken),
      //tokenExpires: { $gt: Date.now() },
      //active:false,
    });
    if (user.active) {
      return res.status(400).json({
        msg: "Activation error. You have already activated your account",
      });
    }
    if (user.tokenExpires < Date.now()) {
      User.findOneAndDelete({
        activationToken: decodeURIComponent(req.params.activationToken),
      });
      return res.status(400).json({
        msg:
          "Activation failed. Your activation code is expired, please register again",
      });
    }

    user.active = true;
    const activatedUser = await user.save();
    res.status(200).json({
      msg: `Congratulations! Your account ${activatedUser.email} has now been activated`,
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

//NEED TO IMPLEMENT ROUTE FOR RESETTING PASSWORD

module.exports = router;
