# User Authentication System with Node.js

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MySQL database set up and running
- Apache server (if using XAMPP or similar)

### Installation

1. **Clone the repository**:

   git clone https://github.com/mansipatidar19/Authorization.git
   cd your-repo


2. **Install dependencies**:
 
   npm install
   

3. **Environment Variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=your_db_port
   JWT_SECRET=your_jwt_secret
   EMAIL=your_email
   EMAIL_PASSWORD=your_email_password
   FRONTEND_URL=your_frontend_url
   

### Starting the Server

1. **Start Apache and MySQL** (if using XAMPP or similar tools).

2. **Run the server**:
   npm start

## API Endpoints

### User Routes

- **Register**: Create a new user
   
  POST http://localhost:8080/api/v1/user/register
   

- **Login**: Authenticate user and receive a token
   
  POST http://localhost:8080/api/v1/user/login
   

- **Logout**: Log out the user
   
  POST http://localhost:8080/api/v1/user/logout
   

### Auth Routes

- **User Details**: Get details of the authenticated user
   
  GET http://localhost:8080/api/v1/auth/userDetails
   

- **Forgot Password**: Request a password reset
   
  POST http://localhost:8080/api/v1/auth/forgetPassword
   

- **Reset Password**: Reset the password using a token
   
  POST http://localhost:8080/api/v1/auth/resetPassword
   

## Dependencies

- **bcrypt**: For hashing passwords to secure user details
- **cookie-parser**: For parsing cookies and storing the token securely
- **dotenv**: For managing environment variables
- **express**: For creating RESTful APIs
- **express-validator**: For validating user data
- **jsonwebtoken**: For generating secure tokens
- **mysql2**: For connecting to the MySQL database
- **nodemailer**: For sending password reset emails
- **nodemon**: For automatically restarting the server on file changes
- **sequelize**: ORM for easy communication with relational databases

## License

This project is licensed under the MIT License.
