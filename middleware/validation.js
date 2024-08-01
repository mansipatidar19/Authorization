import { body, validationResult } from "express-validator";

// Defining the validation rules for registeration
const registerValidationRules = () => {
  return [
    // Validate and sanitize the name
    body("name")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    // Validate and sanitize the email
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    // Validate and sanitize the password
    body("password")
      .isString()
      .withMessage("Password must be a string")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    // Validate and sanitize the phone (Indian format)
    body("phone")
      .isString()
      .withMessage("Phone number must be a string")
      .matches(/^[6-9]\d{9}$/)
      .withMessage(
        "Invalid phone number format. Should be an Indian number with 10 digits starting with 6-9"
      ),
  ];
};

// Defining the validation rules for login
const loginValidationRules = () => [
  // Validate and sanitize the email
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),

  // Validate and sanitize the password
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

// Middleware function to handle validation errors
const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Returning all error in an array
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { registerValidationRules, validateUser, loginValidationRules };
