const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  loginWithProvider: {
    type: Boolean,
    required: true,
    default: false,
  },
  // If the user registers with a provider, we don't need to store the password
  password: {
    type: String,
    required: false,
    min: 6,
    max: 1024,
  },
  address: {
    type: String,
    required: false,
    min: 1,
    max: 255,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    min: 1,
    max: 255,
    default: "",
  },
  avatar: {
    type: String,
    required: false,
    min: 1,
    max: 255,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);
