const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contributor: {
    type: Array,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
  },
  year: {
    type: Number,
    required: true,
  },
  pages: {
    type: String,
  },
  doi: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Publication", publicationSchema);
