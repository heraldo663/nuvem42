const path = require("path");
const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");
const hbs = require("nodemailer-express-handlebars");

// Configure transport options
const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const transport;

if (process.env.NODE_ENV === "production") {
  transport = mailgunTransport(mailgunOptions);
} else {
  transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS
    }
  });
}

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve("./src/resources/mail/"),
  extName: '.html'
}));

module.exports = transport;
