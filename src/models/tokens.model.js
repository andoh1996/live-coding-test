const { required } = require('joi');
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  accessToken: {
    type: String,
    required: true,
  },

  refreshToken: {
   type: String,
    required: true,
  },

  blackListed: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    required: true
  }

})

const Tokens = mongoose.model('tokens', TokenSchema);


module.exports = Tokens;