// ──────────────────────────────────────────────────────────────────────────────
// JWT Authentication Middleware — verifies the bearer token and attaches
// the decoded user payload to `req.user`.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.util';
import { AppError } from '../utils/apiError';

/**
 * Protect routes — requires a valid JWT in the Authorization header.
 * Attaches decoded payload (userId, email, role, hospitalId) to req.user.
 */
export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  // 1) Get token from header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Authentication required. Please provide a valid token.', 401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AppError('Authentication required. Please provide a valid token.', 401);
  }

  try {
    // 2) Verify token using jwt.util
    const decoded = verifyAccessToken(token);

    // 3) Attach user info to request
    req.user = decoded;

    next();
  } catch {
    throw new AppError('Invalid or expired token.', 401);
  }
};

/**
 * Role-based authorization — restricts access to specific roles.
 * Usage: router.get('/admin', authenticate, authorize('Super Admin', 'Hospital Admin'), handler);
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required.', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action.', 403);
    }

    next();
  };
};
