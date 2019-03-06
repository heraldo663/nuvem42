const express = require("express");
const _ = require("lodash");
const { User } = require("../models");

// @TODO: implemente validation

class AdminController {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get("/", this.getUsers);
    this.router.patch("/:id", this.patchUser);
    this.router.delete("/:id", this.deleteUser);
  }

  async getUsers(req, res) {
    try {
      let users = await User.findAll({});
      users = _.reject(users, user => user.username === "nuvem42");
      return res.json(users);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }

  async patchUser(req, res) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const noPasswordUser = {
        username: user.name,
        email: user.email,
        password: ""
      };
      const updatedUser = await user.update({ noPasswordUser });
      return res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      user.destroy();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
}

module.exports = new AdminController().router;
