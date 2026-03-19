// ──────────────────────────────────────────────────────────────────────────────
// Global Error Handler — catches all errors and returns a consistent response.
//
// • Operational errors (AppError): sends the error message & status to client.
// • Programming errors: logs the full stack, sends generic 500 to client.
// • In development: includes the error stack in the response for debugging.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';
import { sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Default values
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: unknown[] | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log the error
  logger.error(`${statusCode} — ${err.message}`, {
    stack: err.stack,
    statusCode,
  });

  // In development, provide more detail
  const isDev = process.env['NODE_ENV'] === 'development';
  if (isDev) {
    errors = [{ message: err.message, stack: err.stack }];
  }

  sendError({ res, statusCode, message, errors });
};
