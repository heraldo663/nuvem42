module.exports = class AppError {
  constructor({ status = 400, message, errors }) {
    this.statusCode = status;
    this.message = message;
    this.errors = errors;
  }
};
