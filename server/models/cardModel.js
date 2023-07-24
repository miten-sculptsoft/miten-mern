const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  Full_name: {
    type: String,
    required: true,
  },
  Job_title: {
    type: String,
  },
  Company_name: {
    type: String,
  },
  Bio: {
    type: String,
  },
  Phone_number: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Website: {
    type: String,
  },
  Address: {
    type: String,
  },
  About: {
    type: String,
  },
  Social_Media: [
    {
      type: String,
    },
  ],
  newColor: {
    type: String,
  },
});

module.exports = mongoose.model("Ecard_data", cardSchema);
