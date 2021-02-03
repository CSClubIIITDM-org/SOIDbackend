const mongoose = require("mongoose");

const objectivesSchema = mongoose.Schema({
  image: {
    type: Buffer,
  },
  newsTitle: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Objectives = mongoose.model("Objectives", objectivesSchema);

module.exports = Objectives;