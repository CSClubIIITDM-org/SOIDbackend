const mongoose = require("mongoose");

const objectivesSchema = mongoose.Schema({
  
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