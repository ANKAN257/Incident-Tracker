
const jwt = require("jsonwebtoken");
const User = require("../modules/user/model/user.model");

const authMiddleware = async (req, res, next) => {
  try {
  
    
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. No token.",
      });
    }

  
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    
    req.user = await User.findById(decoded.id).select("-password");
    
    
    if (!req.user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }
  


 
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = {authMiddleware} 
