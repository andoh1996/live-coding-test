const rateLimit = require('express-rate-limit');
const { message } = require('../validators/users.validator');

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many requestfrom this IP, please try again later'
    },

    standardHeaders: true,
    legacyHeaders: false
})

module.exports = {
    authLimiter
}