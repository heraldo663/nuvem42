const transport = require("../../config/email");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

class EmailService {
  constructor() {
    this.emailClient = transport;
  }

  getTemplate(data) {
    const html = fs.readFileSync(
      path.resolve("./src/resources/mail/auth/forgotPassword.ejs"),
      {
        encoding: "utf-8"
      }
    );
    return ejs.render(html, data);
  }
  sendForgotPassword(to, username, token) {
    return this.emailClient.sendMail({
      from: '"Nuvem42" <nuvem42@exemplo.com>',
      subject: "Nuvem42 Reset Token",
      to,
      html: this.getTemplate({ username, token })
    });
  }
}

module.exports = new EmailService();
