const transport = require("../../config/email");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

class EmailService {
  constructor() {
    this.emailClient = transport;
  }

  getTemplate(from, data) {
    const html = fs.readFileSync(
      path.resolve(`./src/resources/mail/${from}.ejs`),
      {
        encoding: "utf-8"
      }
    );
    return ejs.render(html, data, emailTemplate);
  }
  sendEmail(to, ctx, template) {
    return this.emailClient.sendMail({
      from: '"Nuvem42" <nuvem42@exemplo.com>',
      subject: "Nuvem42 Reset Token",
      to,
      html: this.getTemplate(template, ctx)
    });
  }
}

module.exports = new EmailService();
