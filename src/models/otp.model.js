const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  }

})

const Otp = mongoose.model('otps', OtpSchema);


module.exports = Otp;