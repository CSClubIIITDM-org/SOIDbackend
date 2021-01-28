const mongoose = require("mongoose");

const carousalSchema = mongoose.Schema({
  image: {
    type: Buffer,
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

carousalSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

const Carousal = mongoose.model("CarousalImage", carousalSchema);

module.exports = Carousal;
