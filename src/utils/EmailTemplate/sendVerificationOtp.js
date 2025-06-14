/* eslint-disable prettier/prettier */
const ejs = require("ejs");
const {sendEmailNodeMailer} = require('../nodeMailerConfig')

 
////////////////This function sends verification email on success registration///////
 const sendVerificationOtp = async(Data) => {
    try {

      console.log(Data)
       const email = (Data.email).trim()
   
        const data = await ejs.renderFile(__dirname + "/viewTemplate/verifyEmail.ejs", {Data});

        const mainOptions = {
           from: 'Live Code <benjamin.andoh@abibiman.org>',
           to: email,
           subject: 'Email verification after registration.',
           html: data
          };

          sendEmailNodeMailer.sendMail(mainOptions, (err, info) => {
           if (err) {
               console.log(err);
           }else{
              console.log(info)
           }
           });

    } catch (error) {
              console.log(error);
    }
 }

 


 module.exports = {
     sendVerificationOtp
 }