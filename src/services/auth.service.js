const bcrypt = require('bcryptjs');

const CustomError = require('../classUtils/customErrorClass');

const User = require('../models/users.model');

const {v4: uuidv4} = require('uuid');

const factory = require('./factory.service')


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

      return response;

  } catch (error) {
     throw error
  }
}


  module.exports = {
    registerUser
  }