const Joi = require('joi');

const resetPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

  newPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),

    otp: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

});

module.exports = resetPasswordValidationSchema;
