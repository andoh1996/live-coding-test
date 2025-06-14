const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const UserModel = require('../models/users.model');

const authServices = require('../services/auth.service');

const userValidationSchema = require('../validators/users.validator')

const loginValidationSchema = require('../validators/login.validator')


const registerUser = async(req, res, next) => {
  try {

      const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }


      await authServices.registerUser(req.body);

      const data = {
        message: 'User registered successfully'
      }

      const response =  new SuccessResponse(201, 'success', data);

      return response.sendResponse(res)

  } catch (error) {
    return next(error);
  }
}


const loginUser = async(req, res, next) => {
  try {
     
      const { error } = loginValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }

      
  } catch (error) {
    return next(err);
  }
}

  
  

  module.exports = {
   registerUser

  }