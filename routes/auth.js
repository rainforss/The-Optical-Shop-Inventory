const { model } = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const validate = require("../validation");

//Validation
const joi = require("joi");

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
    req.body.email === "shengyan@ualberta.ca" ||
    req.body.email === "rainforss123@gmail.com"
  ) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send({ user: user._id });
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not match an active user");
  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Password does not match an active user");
  //Create and assign a JSON token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});
module.exports = router;
