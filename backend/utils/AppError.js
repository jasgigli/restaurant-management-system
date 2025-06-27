/**
 * Custom AppError for consistent error handling
 */
class AppError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static db(err, msg = "Database error") {
    return new AppError(msg, 500, err);
  }

  static conflict(msg = "Conflict") {
    return new AppError(msg, 409);
  }
}

export { AppError };
