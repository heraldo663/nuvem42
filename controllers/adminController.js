const { User } = require("../models");

// @TODO: implemente validation

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findall();

      return res.json(users);
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  },

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
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      user.destroy();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  }
};
