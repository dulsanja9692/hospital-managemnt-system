// ──────────────────────────────────────────────────────────────────────────────
// Auth Routes — POST /login, POST /refresh, POST /logout, GET /me
//
// Mounted at: /api/v1/auth
// ──────────────────────────────────────────────────────────────────────────────

import { Router } from 'express';
import { loginHandler, refreshHandler, logoutHandler, getMeHandler } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { authLimiter } from '../../middleware/rateLimiter';
import { loginSchema } from './auth.validation';

const router = Router();

// POST /api/v1/auth/login — rate-limited + validated
router.post('/login', authLimiter, validate({ body: loginSchema }), loginHandler);

// POST /api/v1/auth/refresh — read refresh token from cookie
router.post('/refresh', refreshHandler);

// POST /api/v1/auth/logout — requires valid access token
router.post('/logout', authenticate, logoutHandler);

// GET /api/v1/auth/me — requires valid access token
router.get('/me', authenticate, getMeHandler);

export default router;
