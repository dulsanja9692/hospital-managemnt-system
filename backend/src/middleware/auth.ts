// ──────────────────────────────────────────────────────────────────────────────
// JWT Authentication Middleware — verifies the bearer token and attaches
// the decoded user payload to `req.user`.
//
// This is a skeleton; full implementation depends on your User model.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';
import { AppError } from '../utils/apiError';
import type { JwtPayload } from '../types/index';

/**
 * Protect routes — requires a valid JWT in the Authorization header.
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
    // 2) Verify token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    // 3) Attach user info to request
    req.user = decoded;

    next();
  } catch {
    throw new AppError('Invalid or expired token.', 401);
  }
};

/**
 * Role-based authorization — restricts access to specific roles.
 * Usage: router.get('/admin', authenticate, authorize('admin'), handler);
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
