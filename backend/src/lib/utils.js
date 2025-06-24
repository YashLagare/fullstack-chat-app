// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,                 // Prevent XSS
//     sameSite: "strict",             // Prevent CSRF
//     secure: process.env.ENV !== "development", // Use HTTPS in production
//   });

//   return token;
// };

// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     httpOnly: true,
//     sameSite: "Lax", // "strict" sometimes blocks local cookies
//     secure: false, // Allow cookies on HTTP in development
//   });

//   return token;
// };
// lib/utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userid: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production (https)
    sameSite: "lax", // or "none" if using cross-site cookies + https
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
