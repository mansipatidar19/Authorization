import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Defining the User Schema
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // auto-increment
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // cannot be empty
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // check if its unique
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default User;
