const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller')

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/verify-email', authController.verifyEmail);

router.get('/logout', authController.logOutUser);

router.post('/forget-password', authController.forgotPassword);

router.post('/reset-password', authController.resetPassword)



module.exports = router;