// ──────────────────────────────────────────────────────────────────────────────
// Rate Limiter — protects against brute-force and DDoS attacks.
//
// Default: 100 requests per 15-minute window (configurable via env).
// Returns a standardized JSON error instead of plain text.
// ──────────────────────────────────────────────────────────────────────────────

import rateLimit from 'express-rate-limit';
import { config } from '../config/index';

export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,   // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});

// Stricter limiter for auth endpoints (e.g., login, register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 20,                    // 20 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
  },
});
