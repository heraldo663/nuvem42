const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  register(req, res) {
    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    User.findOne({ where: { email: req.body.email } }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {

        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            User.create(newUser)
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });

  },

  login(req, res) {
    const { email, password } = req.body

    // Find user by email
    User.findOne({ where: { email } }).then(user => {
      // Check for user
      // if (!user) {
      //   errors.email = 'User not found';
      //   return res.status(404).json(errors);
      // }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, username: user.username }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600 * 24 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  },
}