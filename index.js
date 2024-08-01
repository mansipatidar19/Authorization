import express from "express";
import { PORT } from "./config/env.js";
import { dbConnect, sequelize } from "./config/db.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";

// Instance of express 
const app = express();

// Connection to Database (MySQL)
dbConnect();

// For reading JSON data
app.use(express.json());

// For using Cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

(async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log("Database connected!");

    // Sync the models with the database
    await sequelize.sync({ force: false }); // force: false doesn't delete existing tables
    console.log("Database synchronized!");

    // Starting the server 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
