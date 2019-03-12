require("dotenv").config();
const path = require("path");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");

const router = require("./routes");
const asyncErrorHandler = require("./app/middleware/asyncErrorhandler");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.staticFiles();
    this.routes();
  }

  middlewares() {
    this.app.use(passport.initialize());
    require("./config/passport")(passport);

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  staticFiles() {
    this.app.use(
      "/media",
      passport.authenticate("jwt", { session: false }),
      express.static(process.env.MEDIA_ROOT)
    );
    this.app.use(express.static(path.join(__dirname, "client/dist")));
  }

  routes() {
    this.app.use("/api", asyncErrorHandler(router));
    this.app.get("/*", function(req, res) {
      res.send("Server Online");
      // res.sendFile(path.join(__dirname, "client/dist", "index.html"));
    });
  }
}

module.exports = new App().app;
