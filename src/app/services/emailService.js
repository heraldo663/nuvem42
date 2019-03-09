const nodemailer = require("nodemailer");
const transport = require("../../config/emailTransport");

class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport);
  }
  sendText(to, subject, text) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail(
        {
          from: '"Your Name" <youremail@yourdomain.com>',
          to,
          subject,
          text
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    });
  }
}
module.exports = new EmailService();
