const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  phoneNo: {
    type: String,
    required: true,
    min: 6,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  for_whom: {
    type: String,
    required: true,
  },
  for_whom_name: {
    type: String,
    required: true,
  },
  date_when: {
      type: String,
      required: true,
  },
  time_slot: {
      type: String,
      required: true,
  },
  stat: {
      type: String,
      default: 'Pending!',
  },
  reason: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
