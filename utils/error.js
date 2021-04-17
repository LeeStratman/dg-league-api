class BadRequestError {
  constructor() {
    this.status = 400;
    this.message = "Bad Request: Server unable to understand your request";
  }
}

class ResourceExistsError {
  constructor(resource = "Resource") {
    this.status = 404;
    this.message = `${resource} does not exist.`;
  }
}

class UniquePropertyError {
  constructor() {
    this.status = 400;
    this.message = "Bad request: Property must be unique.";
  }
}

class ServerError {
  constructor(err) {
    this.status = 500;
    this.message = `Server Error: ${err}`;
  }
}

class UserExistsError {
  constructor() {
    this.status = 402;
    this.message = `User already exists.`;
  }
}

class CredentialsError {
  constructor() {
    this.status = 401;
    this.message = "Invalid credentials.";
  }
}

class RequiredFieldsError {
  constructor(message) {
    this.status = 400;
    this.message = message;
  }
}

module.exports = {
  BadRequestError,
  ResourceExistsError,
  UniquePropertyError,
  ServerError,
  UserExistsError,
  CredentialsError,
  RequiredFieldsError,
};
