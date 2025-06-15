const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const SuccessResponse = require('../classUtils/CustomResponseClass');
const CustomError = require('../classUtils/customErrorClass');

const UserModel = require('../models/users.model');

const authServices = require('../services/auth.service');
const authMiddlware = require('../middlewares/auth.middleware')

const userValidationSchema = require('../validators/users.validator')
const loginValidationSchema = require('../validators/login.validator')
const verifyEmailValidationSchema = require('../validators/verifyEmail.validator');
const resetPasswordValidationSchema = require('../validators/resetPassword.validator');


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

    console.log(req.body.email)
     
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

const logOutUser = async(req, res, next) => {
  try {
    await authServices.logOutUser();

    const response =  new SuccessResponse(200, true, 'logout successful', null);

    return response.sendResponse(res)
    
  } catch (error) {
    return next(error);
  }
}


const forgotPassword = async(req, res, next) => {
  try {
    const {email} = req.body;

    if(!email){
      throw new CustomError(400, 'Email is required');
    }

    const user = await authServices.forgotPassword(req.body);

    const response =  new SuccessResponse(200, true, 'Otp has been sent to your email', null);

    return response.sendResponse(res)

  } catch (error) {
    return next(error);
  }
}
  


const resetPassword = async(req, res, next) => {
  try {
       const { error } = resetPasswordValidationSchema.validate(req.body, { abortEarly: false });

     if (error) {
        const errors= error.details.map(err => err.message)
        throw new CustomError(400, errors);
      }

     await authServices.resetPassword(req.body);

     const response =  new SuccessResponse(200, true, 'Password reset successfully', null);

    return response.sendResponse(res)

    
  } catch (error) {
    return next(error);
  }
}


const getUserProfile = async(req, res, next) => {
  try {
    const email = req.user.data.email

    const profile = await authServices.getUserProfile(email);

    const response =  new SuccessResponse(200, true, 'User data fetched successfully', profile);

    return response.sendResponse(res)

  } catch (error) {
     return next(error);
  }
}


const getRefreshToken = async(req, res, next) => {
  try {
    const accessToken = await authMiddlware.authenticateRefreshToken(req.body);

    const data = {
      accessToken
    }

     const response =  new SuccessResponse(200, true, 'New access token generated successfully', data);

    return response.sendResponse(res)
  } catch (error) {
     return next(error);
  }
}

  module.exports = {
   registerUser,
   loginUser,
   verifyEmail,
   logOutUser,
   forgotPassword,
   resetPassword,
   getUserProfile,
   getRefreshToken


  }