// ──────────────────────────────────────────────────────────────────────────────
// AppError — custom error class for operational (expected) errors.
//
// `isOperational` distinguishes expected errors (bad input, 404)
// from programmer bugs (uncaught TypeError), enabling the error handler
// to decide whether to expose the message to the client.
// ──────────────────────────────────────────────────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintain proper stack trace (only available on V8)
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly (required for extending built-ins in TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
