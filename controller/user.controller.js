import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { JWT_SECRET } from "../config/env.js";

// register
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // checking if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ Message: "You are already registerd with us!" });
    }

    // hasing password and saving user in databse
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(200).json({ Message: "User registered successfully!" });
  } catch (error) {
    // Checking if phone number is already registered or not
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        Message: "Phone number is already registered",
      });
    }
    console.log("Error occured in registering user:", error);
    res.status(500).json({ Message: "Server error" });
  }
};

// login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if user registered or not
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ Message: "Please register first!" });
    }

    // checking the password if its correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ Message: "Incorrect Password!" });
    }

    // generating token
    const payload = { id: user.id, email: user.email, phone: user.phone };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    // Setting token in cookies
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      sameSite: "strict",
      maxAge: 604800000, // 7 days in milliseconds
    });

    return res.status(200).json({ Message: "Logged In Successfully!", token });
  } catch (error) {
    console.log("Error occured in logging in user:", error);
    res.status(500).json({ Message: "Internal Server error" });
  }
};

// Logout
const logoutUser = (req, res) => {
  try {
    // Clearing the token
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ Message: "Logged out successfully" });
  } catch (error) {
    console.log("Error occured in logging out user:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

export { registerUser, loginUser, logoutUser };
