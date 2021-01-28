const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  agency: {
    type: String,
    required: true,
  },
  funds: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  years: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Research", researchSchema);
