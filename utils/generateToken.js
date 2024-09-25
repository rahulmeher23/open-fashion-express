import jwt from "jsonwebtoken";
import {JWT_SECRET, JWT_REFRESH_EXPIRATION, JWT_EXPIRATION, JWT_REFRESH_SECRET} from "../config/index.js"

const generateAccessToken = (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const generateRefreshToken = (payload) => {
    try {
      return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export { generateAccessToken, generateRefreshToken };