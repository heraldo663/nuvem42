const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, Bucket } = require("../models");
const isNoUserRegistred = require("../middleware/isNoUserRegistred");
const JSONAPISerializer = require("jsonapi-serializer").Serializer;
const JSONAPIError = require("jsonapi-serializer").Error;

// @TODO: implemente validation

class AuthController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post("/register", isNoUserRegistred, this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
    this.router.post("/forgot_password", this.forgotPass.bind(this));
  }
  async register(req, res) {
    if (res.locals.isFirstUser) {
      const newSuperUser = await this.createUser(req.body, true);
      const serializedUserData = this.serializeUserData(newSuperUser);
      res.status(201).send(serializedUserData);
    } else {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(400).json(
          new JSONAPIError({
            status: 400,
            title: "Email already exists",
            detail:
              "This email already registred in your database. Try to reset your password or create a new account with a new email"
          })
        );
      } else {
        const newNormalUser = await this.createUser(req.body, false);
        const serializeddUserData = this.serializeUserData(newNormalUser);
        this.createBaseBuckets(newNormalUser.id);
        res.send(serializeddUserData);
      }
    }
  }

  serializeUserData(userData, linksFunction = "") {
    return new JSONAPISerializer("user", {
      attributes: ["username", "email", "isSuperUser", "isUserActive"],
      dataLinks: linksFunction
    }).serialize(userData);
  }

  createUser(user, isSuperuser) {
    const newUser = User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      isSuperUser: isSuperuser
    });

    return newUser;
  }

  async createBaseBuckets(userId) {
    const root = await Bucket.create({
      bucket: "root",
      rootBucketId: null,
      userId: userId
    });
    await Bucket.create({
      bucket: "musica",
      rootBucketId: root.id,
      userId: userId
    });
    await Bucket.create({
      bucket: "videos",
      rootBucketId: root.id,
      userId: userId
    });
    await Bucket.create({
      bucket: "documentos",
      rootBucketId: root.id,
      userId: userId
    });
  }

  async login(req, res) {
    // Find user by email
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      //@TODO: improve data response
      this.redirectUserWithBlankPassword(password, res);
      this.sendJwtToken(user, res);
    } else {
      return res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "Password is incorrect"
        })
      );
    }
  }

  sendJwtToken(user, res) {
    const payload = { id: user.id, username: user.username }; // Create JWT Payload
    jwt.sign(
      payload,
      process.env.APP_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        return res.json(
          new JSONAPISerializer("user", {
            attributes: ["username", "email", "token", "isSuperUser"]
          }).serialize({
            id: user.id,
            username: user.username,
            email: user.email,
            isSuperUser: user.isSuperUser,
            token: "Bearer " + token
          })
        );
      }
    );
  }

  redirectUserWithBlankPassword(password, res) {
    if (password === "") {
      return res.status(307).json({
        data: {
          message: "Update your password",
          url: `${process.env.APP_URL}api/auth/update`
        }
      });
    }
  }

  async forgotPass(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "Email not found"
        })
      );
    }
    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    const date = now.setHours(now.getHours() + 1);
    this.updateUser(user, token, date);
    res.status(200).send("foi");
  }

  async updateUser(userModel, token, date) {
    const user = await userModel.update({
      passwordResetToken: token,
      passwordResetTokenExpires: date
    });
  }
}

module.exports = new AuthController().router;
