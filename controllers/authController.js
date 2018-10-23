const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      if (req.body.password.length <= 4) {
        res.status(400).send({
          success: false,
          error: "password need to have more then 4 characaters"
        });
      }
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        let errors = { email: "Email already exists" };
        return res.status(400).json({ success: false, errors });
      } else {
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        };

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
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

  async login(req, res) {
    try {
      // Find user by email
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, username: user.username }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 * 24 },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        let errors = { password: "Password incorrect" };
        return res.status(400).json({ errors, success: false });
      }
    } catch (error) {
      res.status(400).json({ error: "email not found", success: false });
    }
  }
};
