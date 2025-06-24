import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized – No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from decoded token
    const user = await User.findById(decoded.userid).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please login again." });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};
