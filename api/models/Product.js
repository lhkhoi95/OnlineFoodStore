const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  image: [
    {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
