// ──────────────────────────────────────────────────────────────────────────────
// Auth Routes — Updated with Protected "Me" Endpoint
// ──────────────────────────────────────────────────────────────────────────────

import { Router } from 'express';
import { loginHandler, refreshHandler, logoutHandler, getMeHandler } from './auth.controller';
import { authenticate } from '../../middleware/auth'; // Ensure this path is correct
import { validate } from '../../middleware/validate';
import { authLimiter } from '../../middleware/rateLimiter';
import { loginSchema } from './auth.validation';

const router = Router();

/**
 * POST /api/v1/auth/login
 * Public endpoint to start a session.
 */
router.post('/login', authLimiter, validate({ body: loginSchema }), loginHandler);

/**
 * POST /api/v1/auth/refresh
 * Uses the refresh token cookie to issue a new access token.
 */
router.post('/refresh', refreshHandler);

/**
 * POST /api/v1/auth/logout
 * Clears the session. Requires authentication to invalidate tokens.
 */
router.post('/logout', authenticate, logoutHandler);

/**
 * GET /api/v1/auth/me
 * Retrieves current user profile and role.
 * CRITICAL: Must use 'authenticate' middleware to populate req.user
 */
router.get('/me', authenticate, getMeHandler);

export default router;