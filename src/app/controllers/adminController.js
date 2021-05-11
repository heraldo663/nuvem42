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
    this.router.delete("/:id", this.deleteUser);
  }

  async getUsers(req, res) {
    let users = await User.findAll({});
    users = _.reject(users, user => user.username === "nuvem42");
    return res.json(users);
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
}

module.exports = new AdminController().router;
