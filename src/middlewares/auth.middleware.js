
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn, refreshTokenExpiresIn, refreshTokenSecret } = require('../config/jwtKeys');


const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication required. Token not provided.' });
  }

  jwt.verify(token, jwtSecret, (error, user) => { // Remove the 'next' argument here
    if (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next(); // Call 'next' to move to the next middleware
  });
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
}