class BadRequestError {
  constructor() {
    this.status = 400;
    this.message = "Bad Request: Server unable to understand your request";
  }
}

class UserExistsError {
  constructor() {
    this.status = 404;
    this.message = "User does not exist.";
  }
}

class UniquePropertyError {
  constructor() {
    this.status = 400;
    this.message = "Bad request: Property must be unique.";
  }
}

module.exports = {
  BadRequestError,
  UserExistsError,
  UniquePropertyError,
};
