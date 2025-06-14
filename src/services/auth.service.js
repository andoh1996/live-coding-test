const bcrypt = require('bcryptjs');

const CustomError = require('../classUtils/customErrorClass');

const User = require('../models/users.model');
const OtpModel = require('../models/otp.model');
const TokenModel = require('../models/tokens.model');

const {v4: uuidv4} = require('uuid');

const factory = require('./factory.service');

const auth = require('../middlewares/auth.middleware');

const otpHandler = require('../utils/otpHandler.util')


const registerUser = async(data) => {
  try {
     const {firstName, lastName, address, email, password, confirmPassword} = data

     ///////Ensure password has the required length/////
      if(password.length < 7){
        throw new CustomError(400, 'password should be more than 6 characters.')
      }

      ///////////check if password is equal tp confirm password////////
      if(password !== confirmPassword){
        throw new CustomError(400, 'passwords are not the same.');
      }

      //////Check if email already exist
      const checkEmail = await factory.fetchOneItemFromDb(User, {email});

      if(checkEmail){
         throw new CustomError(400, 'Email already exist. ');
      }

      ////generate unique userId 
      const userId = uuidv4();
      //////////////Hash password using bcrypt/////////
      const hashedPassword = await bcrypt.hash(password, 10);

      ///////Create registration data////////
      const registrationData = {
        firstName,
        lastName,
        address,
        email,
        userId,
        password: hashedPassword
      }

      const response = await factory.saveToDb(User, registrationData);

      const name = `${firstName} ${lastName}`

      await otpHandler.createRegistrationOtp(email, name);

      return response;

  } catch (error) {
     throw error
  }
}


const verifyEmail = async (data) => {
  try {
    const {email, password} = data;

    ////fetch Otp from the model ///

    const otpData = await factory.fetchOneItemFromDb(OtpModel, {email, password});

    if(!otpData){
       throw new CustomError(400, 'Wrong Otp');
    }

    const updatedUser = await factory.updateOneItemInDb(User, {email}, {emailVerified: true});

    return updatedUser

  } catch (error) {
    throw error
  }
}



const loginUser = async(data) => {
  try {
     const {email, password} = data;

     ///////find the user by email //
     const user = await User.findOne({email}).select('+password');

     if(!user){
      throw new CustomError(400, 'Email is not registered. ');
     }

     ///////Check if the email is verified///

     if(!user.emailVerified){
        throw new CustomError(400, 'verification-needed');
     }

     if(user.isLocked){
        throw new CustomError(403, 'Max login attempt. Try again in 5 minute.');
     }

     ////////check if password is correct
     const isPasswordCorrect = await bcrypt.compare(password, user.password);

     if(!isPasswordCorrect){
      await user.incrementLoginAttempts();

      throw new CustomError(400, 'Invalid password/email');
     }

     //////////Reset login attempt on sucessfull login///
     user.resetPasswordAttempt()

     ////////////generate jwt tokens///////////////
     const {accessToken, refreshToken} = auth.generateAccessKey({
        userId: user.userId,
        role: user.role,
        email : user.email
     })

     await factory.saveToDb(TokenModel, {
       email:  user.email,
       accessToken, 
       refreshToken,
       createdAt : new Date()
     })

     const loginData = {
      userData: user,
      accessToken,
      refreshToken
     };

     return loginData;

  } catch (error) {
    throw error
  }
}

const logOutUser = async(data) => {
  try {
    const{ email } = req.user.data.email

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

    ////Blacklist generated token associated with the user///////////////
     await factory.updateManyItemInDb(TokenModel, {email, accessToken: token}, {blackListed: true});

     return true

  } catch (error) {
    throw error
  }
}


const forgotPassword = async(data) => {
  try {
    const {email} = data;

    /////////Check if email exist in db/////////

    const user = await factory.fetchOneItemFromDb(User, {email});

    if(!user){
       throw new CustomError(400, 'Email is not registered. ');
    }

    const name = `${user.firstName} ${user.lastName}`

    ////////send reset password otp///
    await otpHandler.createResetPasswordOtp(email, name);

    return user;

  } catch (error) {
    throw error
  }
}


const resetPassword = async(data) => {
  try {
     const {newPassword, otp, email} = data;

     const otpData = await factory.fetchOneItemFromDb(OtpModel, {email, otp});

     if(!otpData){
      throw new CustomError(400, 'Wrong Otp.');
     }

     const password = await bcrypt.hash(newPassword, 10);

     const updatedUser = await factory.updateOneItemInDb(User, {email}, {password});

     return updatedUser
  } catch (error) {
     throw error
  }
}



  module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    logOutUser,
    forgotPassword,
    resetPassword
  }