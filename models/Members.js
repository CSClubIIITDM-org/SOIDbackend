const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
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

memberSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
