const jwt = require('jsonwebtoken');
const User = require('../Model/userSchema');

const protect = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }
  const jwtToken = token.replace("Bearer", " ").trim();
  
  try {
    const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log('Token Verified:', isVerified);
    const user = await User.findById(isVerified.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    req.token = jwtToken;
   
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not Admin' });
  }
};


module.exports = { protect ,isAdmin};