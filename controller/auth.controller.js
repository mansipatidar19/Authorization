import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../model/user.model.js";
import { GMAIL, GMAIL_APP_PASSWORD, JWT_SECRET } from "../config/env.js";

// forget password
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  //   Returning email required, if no email found
  if (!email) {
    return res.status(404).json({ Message: "email is required!" });
  }

  //   finding user with email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ Message: "Invalid e-mail!" });
  }
  try {
    // generate token
    const payload = { id: user.id, email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });

    // transporter for sending email to reset password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: GMAIL,
      to: email,
      subject: "Reset Password",
      //   html for styling in email
      html: `
          <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f2f2f2;
                      color: #333333;
                      padding: 20px;
                  }
                  h1 {
                      color: #007bff;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      padding: 20px;
                      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                  }
                  .btn {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 5px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Reset Your Password</h1>
                  <p>Click on the following link to reset your password:</p>
                  <a class="btn" href="http://localhost:8080/api/v1/auth/resetPassword/${token}">Reset Password</a>
                  <p>The link will expire in 10 minutes.</p>
                  <p>If you didn't request a password reset, please ignore this email.</p>
              </div>
          </body>
          </html>
      `,
    };

    transporter.sendMail(mailOptions);

    // sending email sent response
    return res
      .status(400)
      .json({ Message: "Visit your email to reset password" });
  } catch (error) {
    console.log("Error occured in forget Password:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
    
  // destructuring newpassword
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ Message: "Password required!" });
  }
  try {

    // reading and verifying token
    const token = req.params.token;
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // validations
    if (!decodedToken) {
      return res.status(400).json({ Message: "Invalid Token!" });
    }
    const user = await User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      return res.status(404).json({ Messsge: "User not found!" });
    }

    // hasing password and saving it in db
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });
    res.status(200).send({ Message: "Password updated" });

  } catch (error) {
    console.log("Error occured in reset Password:", error);
    res.status(500).send({ Message: error.message });
  }
};

const userDetails = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ Message: "Please login first!" });
  }
  // Returning user details to show on the dashboard
  return res.status(200).json({ User: user });
};

export { forgetPassword, resetPassword, userDetails };
