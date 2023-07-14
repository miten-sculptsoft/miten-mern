const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Birthday: {
    type: String,
    required: true,
  },
  Phone_Number: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Address_line_1: {
    type: String,
    required: true,
  },
  Address_line_2: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
