// ──────────────────────────────────────────────────────────────────────────────
// Async Handler — wraps async route handlers so rejected promises are
// automatically forwarded to the Express error-handling middleware.
//
// Without this, every async handler would need its own try/catch.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
