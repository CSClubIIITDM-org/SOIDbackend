const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  info: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Contact", contactSchema);
