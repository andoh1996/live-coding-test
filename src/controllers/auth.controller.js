const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const UserModel = require('../models/users.model');

const authServices = require('../services/auth.service');

const userValidationSchema = require('../validators/users.validator')
const loginValidationSchema = require('../validators/login.validator')
const verifyEmailValidationSchema = require('../validators/verifyEmail.validator');


const registerUser = async(req, res, next) => {
  try {

      const { error } = userValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }


      await authServices.registerUser(req.body);


      const response =  new SuccessResponse(201, true, 'User registered successfully', null);

      return response.sendResponse(res)

  } catch (error) {
    return next(error);
  }
}

const verifyEmail = async(req, res, next) => {
  try {
      const { error } = verifyEmailValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }

      const updatedUser = await authServices.verifyEmail(req.body);


      const response =  new SuccessResponse(200, true, 'User verified successfully', null);

      return response.sendResponse(res)

  } catch (error) {
    
  }
}


const loginUser = async(req, res, next) => {
  try {
     
      const { error } = loginValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }

      const loginData = await authServices.loginUser(req.body);


     const response =  new SuccessResponse(200, true, 'User login successfully', loginData);

      return response.sendResponse(res)
      
  } catch (error) {
    return next(error);
  }
}

// const logOutUser = async(req, res, next) => {
//   try {
//      req.session.destroy(err => {
//       if(err){
//         throw new CustomError(400, 'Logout failed');
//       }

//       ///////Clear cookie
//       res.clearCookie('connect.sid');
//      })
    
//   } catch (error) {
//     return next(error);
//   }
// }
  
  

  module.exports = {
   registerUser,
   loginUser,
   verifyEmail,


  }