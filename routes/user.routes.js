import express from "express";
import {
  loginValidationRules,
  registerValidationRules,
  validateUser,
} from "../middleware/validation.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";

// Instance of express router
export const userRouter = express.Router();

// User routes with middlewares
userRouter.post(
  "/register",
  // validation middlewares
  registerValidationRules(),
  validateUser,
  // register controller
  registerUser
);

userRouter.post(
  "/login",
  // login middleware
  loginValidationRules(),
  validateUser,
  // login controller
  loginUser
);

userRouter.post("/logout", logoutUser);
