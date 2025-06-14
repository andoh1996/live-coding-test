const TokenModel = require('../models/tokens.model')

const CustomError = require('../classUtils/customErrorClass');

const factory = require('../services/factory.service');

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn, refreshTokenExpiresIn, refreshTokenSecret } = require('../config/jwtKeys');


const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new CustomError(401, 'Authentication required. Token not provided.');
    }

    // Use the promise version
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          reject(new CustomError(401, 'Invalid token.'));
        } else {
          resolve(decoded);
        }
      });
    });

    req.user = user;

    // Check if token is blacklisted
    const dbTokens = await factory.fetchOneItemFromDb(TokenModel, { 
      email: user.email, 
      blackListed: true 
    });

    if (dbTokens) {
      throw new CustomError(401, 'Token expired or blacklisted.');
    }

    next();

  } catch (error) {
    next(error); 
  }
};

const authenticateRefreshToken = async (req, res, next) => {
  try {
    const { token, email } = req.body;

    if (!token) {
      throw new CustomError(401, 'Refresh token required.');
    }

   
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, refreshTokenSecret, (err, decoded) => {
        if (err) {
          reject(new CustomError(403, 'Error in authenticating token.'));
        } else {
          resolve(decoded);
        }
      });
    });

  
    const accessToken = jwt.sign(
      { data: payload.data }, 
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );


    return accessToken

  } catch (error) {
    next(error);
  }
};



 
const generateAccessKey = (user) => {
  const accessToken =  jwt.sign({ data: user }, jwtSecret, { expiresIn: jwtExpiresIn });

  const refreshToken = jwt.sign({data: user}, refreshTokenSecret, {expiresIn: refreshTokenExpiresIn})

  return {
    accessToken,
    refreshToken
  }
 };

module.exports = {
  authenticateToken,
  generateAccessKey,
  authenticateRefreshToken
}