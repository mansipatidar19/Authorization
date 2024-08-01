import env from "dotenv";

// env configuration
env.config();

// exporting all environment variables
export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;

export const DB_HOST = process.env.DB_HOST;

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const DB_PORT = process.env.DB_PORT;

export const GMAIL = process.env.GMAIL;

export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
