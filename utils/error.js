class BadRequestError {
  constructor() {
    this.status = 400;
    this.message = "Bad Request: Server unable to understand your request";
  }
}

module.exports = {
  BadRequestError,
};
