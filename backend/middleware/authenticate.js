const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config'); 

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log('Token:', token);
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token missing.' });
    }
  
    try {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
              console.error('Error verifying token:', err);
              return res.status(403).json({ message: 'Invalid token.' });
            }
            console.log('Decoded:', decoded);
            req.userId = decoded.userId; // Accessing "userId" property from the decoded object
            console.log('Decoded userId:', req.userId);
            next();
          });
      } catch (err) {
        console.error('Error decoding token:', err);
        return res.status(500).json({ message: 'Server error.' });
      }
  };

module.exports = authenticateToken;
