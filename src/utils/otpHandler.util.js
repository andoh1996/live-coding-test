const OtpModel = require('../models/otp.model');

const factory = require('../services/factory.service');

const {sendVerificationOtp} = require('../utils/EmailTemplate/sendVerificationOtp')


const createRegistrationOtp = async(email, name) => {
    try {
        
        const minimum = 1000;
        const maximum = 9999

        ///////generate random 4 numbers///////////////
        const otp = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

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

module.exports = {
    createRegistrationOtp
}