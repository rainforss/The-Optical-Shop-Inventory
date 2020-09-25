const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    active: {
      type: Boolean,
      default: false,
    },
    activationToken: {
      type: String,
      unique: true,
    },
    tokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
