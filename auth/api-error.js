class APiError extends Error {
  toJSON() {
    return {
      success: false,
      message: this.message,
      ...(this.data && { data: this.data }),
      ...(this.statusCode && { statusCode: this.statusCode }),
    };
  }
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOPerational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new APiError(400, message);
  }
  static unAuthorized(message = "UnAuthorized") {
    return new APiError(401, message);
  }
  static conflict(message = "Conflict - user already exists") {
    return new APiError(409, message);
  }
  static forBidden(message = "no Access") {
    return new APiError(412, message);
  }
  static notFound(message = "no Access") {
    return new APiError(412, message);
  }
}

export default APiError;
