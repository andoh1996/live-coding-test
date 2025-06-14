const Joi = require('joi');

const LoginValidationSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    })
});

module.exports = LoginValidationSchema;
