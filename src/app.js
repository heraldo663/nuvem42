require("dotenv").config();
const path = require("path");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./app/routes/api/auth");
const adminRouter = require("./app/routes/api/admin");
const bucketRouter = require("./app/routes/api/bucket");
const assetsRouter = require("./app/routes/api/assets");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(passport.initialize());
    require("./app/services/passport")(passport);

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  routes() {
    this.app.use(
      "/media",
      passport.authenticate("jwt", { session: false }),
      express.static(process.env.MEDIA_ROOT)
    );
    this.app.use(express.static(path.join(__dirname, "client/dist")));

    this.app.use(
      "/api/admin",
      passport.authenticate("jwt", { session: false }),
      adminRouter
    );
    this.app.use("/api/auth", authRouter);
    this.app.use(
      "/api/bucket",
      passport.authenticate("jwt", { session: false }),
      bucketRouter
    );
    this.app.use(
      "/api/bucket/:bucket_id/assets",
      passport.authenticate("jwt", { session: false }),
      assetsRouter
    );

    this.app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/dist", "index.html"));
    });
  }
}

module.exports = new App().app;
