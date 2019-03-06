const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User, Bucket } = require("../models");

// @TODO: implemente validation

class AuthController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.patch("/update", this.update);
  }
  async register(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        let error = "Email already exists";
        return res.status(400).json({ success: false, error });
      } else {
        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password || ""
        };

        const user = await User.create(newUser);

        try {
          const userWithoutPassword = _.pick(user, ["id", "username", "email"]);
          const newRoot = {
            bucket: "root",
            rootBucketId: null,
            userId: userWithoutPassword.id
          };
          const root = await Bucket.create(newRoot);

          const newMusic = {
            bucket: "musica",
            rootBucketId: root.id,
            userId: userWithoutPassword.id
          };
          const newVideos = {
            bucket: "videos",
            rootBucketId: root.id,
            userId: userWithoutPassword.id
          };
          const newDocuments = {
            bucket: "documentos",
            rootBucketId: root.id,
            userId: userWithoutPassword.id
          };

          await Bucket.create(newMusic);
          await Bucket.create(newVideos);
          await Bucket.create(newDocuments);

          res.send({
            user: userWithoutPassword
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      res.status(500).send({ error, success: false });
    }
  }

  async login(req, res) {
    try {
      // Find user by email
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        if (password === "") {
          const userWithoutPassword = _.pick(user, ["id", "username", "email"]);
          return res.status(307).json({
            message: "Update your password",
            userWithoutPassword,
            url: `${process.env.APP_URL}api/auth/update`
          });
        }
        // User Matched
        const payload = { id: user.id, username: user.username }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          process.env.APP_SECRET,
          { expiresIn: 3600 * 24 },
          (err, token) => {
            const userWithoutPassword = _.pick(user, [
              "id",
              "username",
              "email"
            ]);

            return res.json({
              user: userWithoutPassword,
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .send({ error: "Password incorrect", success: false });
      }
    } catch (error) {
      res.status(400).send({ error: "email not found", success: false });
    }
  }

  async update(req, res) {
    let userModel = await Bucket.findOne({ id: req.params.id });
    const updatedUser = {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    if (updatedUser) {
      await userModel.update({ updatedUser });
      return res.json({ success: true, message: "user updated!" });
    }
  }
}

module.exports = new AuthController().router;
