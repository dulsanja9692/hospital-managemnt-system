// ──────────────────────────────────────────────────────────────────────────────
// Config — validates and exports all environment variables at startup.
// Uses `envalid` to fail fast if any required variable is missing or invalid.
// ──────────────────────────────────────────────────────────────────────────────

import { cleanEnv, str, port, num } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  // ── Server ──
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: port({ default: 5000 }),

  // ── Database ──
  DATABASE_URL: str({ desc: 'PostgreSQL connection string' }),

  // ── Authentication ──
  JWT_SECRET: str({ desc: 'Secret key for signing JWTs' }),
  JWT_EXPIRES_IN: str({ default: '7d', desc: 'JWT expiration duration' }),

  // ── Rate Limiting ──
  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000, desc: 'Rate limit window in ms' }),
  RATE_LIMIT_MAX: num({ default: 100, desc: 'Max requests per window' }),

  // ── CORS ──
  CORS_ORIGIN: str({ default: 'http://localhost:3000', desc: 'Allowed CORS origin(s)' }),
});

export const config = {
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
  port: env.PORT,
  databaseUrl: env.DATABASE_URL,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },
  corsOrigin: env.CORS_ORIGIN,
} as const;

export type Config = typeof config;
