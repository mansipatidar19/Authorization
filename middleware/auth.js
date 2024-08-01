import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

// Cheking if user is logged in 
export const authorizeUser = async (req, res, next) => {
  // getting the token from cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ Message: "Unauthorised User!" });
  }
  try {
    // verifying user details
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // storing user details in request for future use
    req.user = decoded;

    // next middleware
    next();
  } catch (error) { 
    console.log("Error occured while authorization:", error);
    return res.status(500).json({ Message: error });
  }
};
