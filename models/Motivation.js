const mongoose = require("mongoose");

const motivationSchema = mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Motivation = mongoose.model("Motivation", motivationSchema);

module.exports = Motivation;