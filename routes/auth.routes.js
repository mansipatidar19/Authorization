import express from "express";
import { authorizeUser } from "../middleware/auth.js";
import {
  forgetPassword,
  resetPassword,
  userDetails,
} from "../controller/auth.controller.js";

// Instance of express router
export const authRouter = express.Router();

// Routes for user authorization
authRouter.post("/forgetPassword", forgetPassword);
authRouter.post("/resetPassword/:token", resetPassword);
authRouter.get("/userDetails", authorizeUser, userDetails);
