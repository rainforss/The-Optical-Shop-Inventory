const nodemailer = require("nodemailer");
const mailer = require("../../utilities/mailer");
const crypto = require("crypto");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const validate = require("../../validation");

//Register
router.post("/register", async (req, res) => {
  //Validate data before making requests
  const { error } = validate.registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res
      .status(400)
      .send(`User with email ${req.body.email} already exists`);
  }

  //Secure the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
    const activationLink = `http://localhost:3000/api/user/activate/${encodeURIComponent(
      user.activationToken
    )}`;

    //Configure email
    const mailOptions = {
      to: req.body.email,
      html: `Please click the following link to <a href="${activationLink}">${activationLink}</a> to activate your account.`,
    };
    try {
      mailer(mailOptions, res);
      const savedUser = await user.save();
      res.send(`The activation email has been sent to ${user._id}`);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("Only invited users can register");
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = validate.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email exists
  const user = await User.findOne({ email: req.body.email, active: true });
  if (!user) return res.status(400).send("Email does not match an active user");

  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Password does not match an active user");

  //Create and assign a JSON token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

router.get("/activate/:activationToken", (req, res, next) => {
  User.findOne(
    {
      activationToken: decodeURIComponent(req.params.activationToken),
      tokenExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).send("failed");
      }

      user.active = true;
      user.save((err, user) => {
        if (err) return next(err);
        res.status(200).send("success");
      });
    }
  );
});

module.exports = router;
