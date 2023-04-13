// Import the Express package and create a new router object
var express = require('express');
var router = express.Router();

// Import the JSend package and use its middleware for sending JSON responses
var jsend = require('jsend');
router.use(jsend.middleware);

// Import the Node.js crypto package for password hashing
var crypto = require('crypto');

// Import the Node.js JSON Web Token (JWT) package for creating secure tokens
var jwt = require('jsonwebtoken');

// Import the Node.js body-parser package for parsing request bodies
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Import the User Service module and create a new instance of it using the database connection
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);

// Export the router object for use in other parts of the application
module.exports = router;






// Route for user login
router.post("/login", jsonParser, async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Get user data from database by email
  userService.getOne(email).then((data) => {
      // If user not found, return error
      if(data === null) {
          return res.jsend.fail({"result": "Incorrect email or password"});
      }

      // Verify password using PBKDF2
      crypto.pbkdf2(password, data.Salt, 310000, 32, 'sha256', function(err, hashedPassword) {
          if (err) { return cb(err); }

          // If password doesn't match, return error
          if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
              return res.jsend.fail({"result": "Incorrect email or password"});
          }
        
          // If password matches, create a JWT token
          let token;
          try {
              token = jwt.sign(
                  { id: data.id, email: data.Email },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "1h" }
              );
          } catch (err) {
              res.jsend.error("Something went wrong with creating JWT token")
          }

          // Return success with user data and JWT token
          res.jsend.success({"result": "You are logged in", "id": data.id, email: data.Email, token: token});
      });
  });
});





// Route for user sign-up
router.post("/signup", async (req, res, next) => {
  // Extract name, email, and password from request body
  const { name, email, password } = req.body;

  // Generate a random salt for password hashing
  var salt = crypto.randomBytes(16);

  // Hash the password using PBKDF2 with the generated salt
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }

      // Call the user service to create a new user with the hashed password and salt
      userService.create(name, email, hashedPassword, salt)

      // Send a success response to the client
      res.jsend.success({"result": "You created an account."});
  });
});

module.exports = router;