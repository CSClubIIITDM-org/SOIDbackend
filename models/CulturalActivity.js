const mongoose = require("mongoose");

const culturalSchema = mongoose.Schema({
  image: {
    type: Buffer,
  },
  event: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

culturalSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

const Cultural = mongoose.model("CulturalActivity", culturalSchema);

module.exports = Cultural;
