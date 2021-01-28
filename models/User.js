const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 1024,
  },
  token: {
    type: String,
    required: true,
    min: 4,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
