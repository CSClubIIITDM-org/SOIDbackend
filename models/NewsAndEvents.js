const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
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

newsSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

const NewsAndEvents = mongoose.model("NewsAndEvents", newsSchema);

module.exports = NewsAndEvents;