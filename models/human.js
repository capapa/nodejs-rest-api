const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GeoShcema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});

const HumanSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  age: {
    type: Number,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: {
    type: GeoShcema,
    index: "2dsphere",
  },
});

const Human = mongoose.model("humans", HumanSchema);

module.exports = Human;
