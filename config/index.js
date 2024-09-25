import dotenv from "dotenv";
dotenv.config();

export const {
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION,
} = process.env;