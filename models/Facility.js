const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema({
  image: {
    type: Buffer,
  },
  name: {
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

facilitySchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;
