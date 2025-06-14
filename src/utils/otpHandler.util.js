const OtpModel = require('../models/otp.model');

const factory = require('../services/factory.service');

const {sendVerificationOtp} = require('../utils/EmailTemplate/sendVerificationOtp');

const {sendResetPasswordOtp} = require('../utils/EmailTemplate/resetPassword')

const helperFunctions = require('../helpers/helperFunctions')


const createRegistrationOtp = async(email, name) => {
    try {
        const otp = helperFunctions.otpGenerator();

        const data = {
            email, otp
        }

        ////save otp to email/////////
       await factory.saveToDb(OtpModel, data);

       sendVerificationOtp({email, name, otp});

       return true


    } catch (error) {
        throw error
    }
}

const createResetPasswordOtp = async(email, name) => {
    try {
        const otp = helperFunctions.otpGenerator();

        const data = {
            email, otp
        }

        ////save otp to email/////////
       await factory.saveToDb(OtpModel, data);

       sendResetPasswordOtp({email, name, otp});

       return true


    } catch (error) {
        throw error
    }
}


module.exports = {
    createRegistrationOtp,
    createResetPasswordOtp
}