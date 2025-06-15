const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter,authController.registerUser);

router.post('/login', authLimiter, authController.loginUser);

router.post('/verify-email',authLimiter, authController.verifyEmail);

router.get('/logout', authLimiter, authController.logOutUser);

router.post('/forget-password', authLimiter, authController.forgotPassword);

router.post('/reset-password', authLimiter, authController.resetPassword);

router.get('/profile', authLimiter, authController.getUserProfile);

router.post('/refresh-token', authController.getRefreshToken);



module.exports = router;