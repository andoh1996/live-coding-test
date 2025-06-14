const Joi = require('joi');

const LoginValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

 otp: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input otp',
    }),

 
});

module.exports = LoginValidationSchema;