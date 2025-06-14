const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your first name',
    }),

  lastName: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your last name',
    }),

  phone: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your phone',
    }),

   address: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input your address',
    }),


  email: Joi.string()
    .required()
    .messages({
      'string.empty': 'Please input email',
    }),

    confirmPassword: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
    })
});

module.exports = userValidationSchema;
