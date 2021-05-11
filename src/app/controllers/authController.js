const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { User, Bucket } = require("../models");
const AppError = require("../core/AppError");
const emailService = require("../providers/emailService");
class AuthController {
  async register(req, res) {
    if (res.locals.isFirstUser) {
      const newSuperUser = await this.createUser(req.body, true);
      await this.createBaseBuckets(newSuperUser.id);
      return res.status(201).send({ user: newSuperUser });
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
        await this.createBaseBuckets(newNormalUser.id);
        return res.status(201).send({
          user: newNormalUser,
        });
      }
    }
  }

  async createUser(user, isSuperuser) {
    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      isSuperUser: isSuperuser,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isUserActive: newUser.isUserActive,
      createdAt: newUser.createdAt,
    };
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
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user == null)
      return res.status(400).json({
        errors: {
          msg: "user does not existe",
        },
      });
    const isMatch = await bcrypt.compare(password, user.password);
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
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isSuperUser: user.isSuperUser,
      isUserActive: user.isUserActive,
      token: "Bearer " + tokens.accessToken,
      refreshToken: tokens.refreshToken || null,
    });
  }

  async forgotPass(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).send(
        new AppError({
          status: 400,
          message: "Email not found",
          errors: ["Email not found"],
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
    const { refreshToken } = req.body;
    if (!refreshToken)
      res.status(400).send(
        new AppError({
          status: 400,
          message: "No token sent!",
          errors: ["Token required"],
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
    const { token, newPassword, email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (new Date(user.passwordResetTokenExpires).getTime() >= Date.now()) {
      this.updateUserPasswordWithValidToken(token, newPassword, user, res);
    } else {
      res.status(400).send(
        new AppError({
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
        new AppError({
          status: 400,
          message: "Token is invalid",
          errors: ["Invalid Token"],
        })
      );
    }
  }
}

module.exports = new AuthController();
