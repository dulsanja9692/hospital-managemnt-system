// ──────────────────────────────────────────────────────────────────────────────
// Auth Controller — thin HTTP handlers for authentication endpoints.
//
// Controllers only:
//   1. Extract data from the request
//   2. Call the service layer
//   3. Send the response
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/apiError';
import * as authService from './auth.service';
import { config } from '../../config/index';

/** Cookie options for the refresh token. */
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

/**
 * POST /api/v1/auth/login
 * Authenticate a user and return tokens.
 */
export const loginHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  const result = await authService.login(email, password);

  // Set refresh token as httpOnly cookie for security
  res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);

  sendSuccess({
    res,
    statusCode: 200,
    message: 'Login successful',
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});

/**
 * POST /api/v1/auth/refresh
 * Issue a new access token using the refresh token cookie.
 */
export const refreshHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const oldRefreshToken = req.cookies?.refreshToken as string | undefined;
  if (!oldRefreshToken) {
    throw new AppError('No refresh token provided.', 401);
  }

  const result = await authService.refreshToken(oldRefreshToken);

  // Set the new rotated refresh token as httpOnly cookie
  res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);

  sendSuccess({
    res,
    statusCode: 200,
    message: 'Token refreshed successfully',
    data: {
      accessToken: result.accessToken,
    },
  });
});

/**
 * POST /api/v1/auth/logout
 * Invalidate the refresh token and clear the cookie.
 */
export const logoutHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.refreshToken as string | undefined;

  // We only attempt to call the service if we have a user from the 'protect' middleware
  if (refreshToken && req.user) {
    await authService.logout(refreshToken, req.user.userId);
  }

  // Clear the cookie regardless of logout success
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'strict' as const,
    path: '/',
  });

  sendSuccess({
    res,
    statusCode: 200,
    message: 'Logged out successfully',
  });
});

/**
 * GET /api/v1/auth/me
 * Return the current authenticated user's details.
 * * FIXED: 'data' now returns the user object directly so App.tsx 
 * can set the user state immediately and stop the loading spinner.
 */
export const getMeHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Ensure the 'protect' middleware has populated req.user
  if (!req.user) {
    throw new AppError('Authentication required. Please login.', 401);
  }

  const user = await authService.getMe(req.user.userId);

  sendSuccess({
    res,
    statusCode: 200,
    message: 'User details retrieved successfully',
    // We send 'user' directly so response.data in Frontend IS the user object
    data: user, 
  });
});