const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, Bucket } = require("../models");
const isNoUserRegistred = require("../middleware/isNoUserRegistred");
const JSONAPISerializer = require("jsonapi-serializer").Serializer;
const JSONAPIError = require("jsonapi-serializer").Error;
const emailService = require("../providers/emailService");
const { check, validationResult } = require("express-validator/check");

//@TODO: MOVE VALIDATION SCHEMA TO SEPARATE FILE
const registerValidation = [
  check("username").exists(),
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
];
const updatePasswordValidation = [
  check("email").isEmail(),
  check("newPassword").isLength({ min: 5 }),
  check("token").exists(),
];

const loginValidation = [
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
];

// @TODO: implemente validation

class AuthController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.post(
      "/register",
      registerValidation,
      isNoUserRegistred,
      this.register.bind(this)
    );
    this.router.post("/login", loginValidation, this.login.bind(this));
    this.router.post(
      "/forgot_password",
      [check("email").isEmail()],
      this.forgotPass.bind(this)
    );
    this.router.post(
      "/update_password",
      updatePasswordValidation,
      this.updatePassword.bind(this)
    );
    this.router.post(
      "/refresh_token",
      [check("refreshToken").exists()],
      this.refreshToken.bind(this)
    );
  }

  handleValidationErrors(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        errors: errors.array(),
      };
    } else {
      return false;
    }
  }
  async register(req, res) {
    const isValid = this.handleValidationErrors(req);
    if (!!isValid) {
      return res.status(400).send(isValid);
    }
    if (res.locals.isFirstUser) {
      const newSuperUser = await this.createUser(req.body, true);
      const serializedUserData = this.serializeUserData(newSuperUser);
      await this.createBaseBuckets(newSuperUser.id);
      return res.status(201).send(serializedUserData);
    } else {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(400).json({
          errors: {
            msg: "Email already registered!",
          },
        });
      } else {
        const newNormalUser = await this.createUser(req.body, false);
        const serializeddUserData = this.serializeUserData(newNormalUser);
        await this.createBaseBuckets(newNormalUser.id);
        return res.status(201).send(serializeddUserData);
      }
    }
  }

  serializeUserData(userData, linksFunction = "") {
    return new JSONAPISerializer("user", {
      attributes: ["username", "email", "isSuperUser", "isUserActive"],
      dataLinks: linksFunction,
    }).serialize(userData);
  }

  createUser(user, isSuperuser) {
    const newUser = User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      isSuperUser: isSuperuser,
    });

    return newUser;
  }

  async createBaseBuckets(userId) {
    const root = await Bucket.create({
      bucket: "root",
      rootBucketId: null,
      userId: userId,
    });
    await Bucket.create({
      bucket: "musica",
      rootBucketId: root.id,
      userId: userId,
    });
    await Bucket.create({
      bucket: "videos",
      rootBucketId: root.id,
      userId: userId,
    });
    await Bucket.create({
      bucket: "documentos",
      rootBucketId: root.id,
      userId: userId,
    });
  }

  async login(req, res) {
    const isValid = this.handleValidationErrors(req);
    if (!!isValid) {
      return res.status(400).send(isValid);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user == null)
      return res.status(400).json({
        errors: {
          msg: "user does not existe",
        },
      });
    const isMatch = await bcrypt.compare(password, user.password);
    this.redirectUserWithBlankPassword(password, res);
    if (isMatch) {
      const accessToken = await this.createAcessToken(user);
      const refreshToken = await this.createRefreshToken(user);
      this.sendLoginTokens({ accessToken, refreshToken }, user, res);
    } else {
      return res.status(400).send({ errors: { msg: "Password is incorrect" } });
    }
  }

  async createAcessToken(user) {
    const payload = { id: user.id, username: user.username };
    const accessToken = await jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: 1500,
    });

    return accessToken;
  }

  async createRefreshToken(user) {
    const payload = { id: user.id, username: user.username };
    const refreshToken = await jwt.sign(
      payload,
      process.env.APP_SECRET_REFRESH_TOKEN,
      { expiresIn: 3600 * 30 }
    );

    return refreshToken;
  }

  sendLoginTokens(tokens, user, res) {
    res.json(
      new JSONAPISerializer("user", {
        attributes: [
          "username",
          "email",
          "isSuperUser",
          "isUserActive",
          "token",
          "refreshToken",
        ],
      }).serialize({
        id: user.id,
        username: user.username,
        email: user.email,
        isSuperUser: user.isSuperUser,
        isUserActive: user.isUserActive,
        token: "Bearer " + tokens.accessToken,
        refreshToken: tokens.refreshToken || null,
      })
    );
  }

  redirectUserWithBlankPassword(password, res) {
    if (password === "") {
      return res.status(307).json({
        data: {
          message: "Update your password",
          url: `${process.env.APP_URL}api/auth/update`,
        },
      });
    }
  }

  async forgotPass(req, res) {
    const isValid = this.handleValidationErrors(req);
    if (!!isValid) {
      return res.status(400).send(isValid);
    }
    const { email } = req.body;
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "Email not found",
        })
      );
    }
    const token = crypto.randomBytes(4).toString("hex").toUpperCase();
    const now = new Date();
    const date = now.setHours(now.getHours() + 1);
    this.updateUserResetToken(user, token, date);
    emailService.sendEmail(
      email,
      { username: user.username, token },
      "auth/forgotPassword"
    );
    res.send({
      data: { success: true, message: "Email with token sent!" },
    });
  }

  async refreshToken(req, res) {
    const isValid = this.handleValidationErrors(req);
    if (!!isValid) {
      return res.status(400).send(isValid);
    }
    const { refreshToken } = req.body;
    if (!refreshToken)
      res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "No token sent!",
        })
      );
    const jwtPayload = jwt.verify(
      refreshToken,
      process.env.APP_SECRET_REFRESH_TOKEN
    );
    if (jwtPayload.exp * 1000 >= Date.now()) {
      const user = await User.findByPk(jwtPayload.id);
      const accessToken = await this.createAcessToken(user);
      this.sendLoginTokens({ accessToken }, user, res);
    }
  }

  async updateUserResetToken(userModel, token, date) {
    const user = await userModel.update({
      passwordResetToken: token,
      passwordResetTokenExpires: date,
    });
  }

  async updatePassword(req, res) {
    const isValid = this.handleValidationErrors(req);
    if (!!isValid) {
      return res.status(400).send(isValid);
    }
    const { token, newPassword, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (new Date(user.passwordResetTokenExpires).getTime() >= Date.now()) {
      this.updateUserPasswordWithValidToken(token, newPassword, user, res);
    } else {
      res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "Your token expired",
        })
      );
    }
  }

  async updateUserPasswordWithValidToken(token, newPassword, user, res) {
    if (token === user.passwordResetToken) {
      await user.update({
        passwordResetToken: null,
        password: newPassword,
      });

      res.status(200).json({
        data: {
          success: true,
          message: "Password updated",
        },
      });
    } else {
      res.status(400).send(
        new JSONAPIError({
          status: 400,
          title: "Token is invalid",
        })
      );
    }
  }
}

module.exports = new AuthController().router;
