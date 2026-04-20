// ──────────────────────────────────────────────────────────────────────────────
// 404 Handler — returns a consistent "not found" response for unmatched routes.
// Must be registered AFTER all route definitions.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};
