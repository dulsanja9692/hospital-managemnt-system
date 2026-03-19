// ──────────────────────────────────────────────────────────────────────────────
// API Response Helpers — enforce a consistent JSON envelope for all responses.
//
// Success shape: { success: true, message, data, meta? }
// Error shape:   { success: false, message, errors? }
// ──────────────────────────────────────────────────────────────────────────────

import type { Response } from 'express';

interface SuccessOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

interface ErrorOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  errors?: unknown[];
}

export function sendSuccess<T>({ res, statusCode = 200, message = 'OK', data, meta }: SuccessOptions<T>): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}

export function sendError({ res, statusCode = 500, message = 'Internal Server Error', errors: errs }: ErrorOptions): void {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errs ? { errors: errs } : {}),
  });
}
