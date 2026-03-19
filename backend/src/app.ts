// ──────────────────────────────────────────────────────────────────────────────
// Express Application Factory — creates and configures the Express app.
//
// Middleware registration order matters:
//   1. Security (helmet, cors)
//   2. Performance (compression)
//   3. Rate limiting
//   4. Body parsing
//   5. Logging
//   6. Routes
//   7. Error handling (404 → global error handler)
// ──────────────────────────────────────────────────────────────────────────────

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { config } from './config/index';
import { rateLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/requestLogger';
import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

// ── Route imports ──
import healthRoutes from './modules/health/health.routes';

const app = express();

// ─────────────────────────── Security ────────────────────────────────────────
// Helmet sets various HTTP headers (CSP, HSTS, X-Content-Type-Options, etc.)
app.use(helmet());

// CORS — only allow requests from trusted origins
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─────────────────────────── Performance ─────────────────────────────────────
// gzip compression for all responses
app.use(compression());

// ─────────────────────────── Rate Limiting ───────────────────────────────────
app.use(rateLimiter);

// ─────────────────────────── Body Parsing ────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ─────────────────────────── Logging ─────────────────────────────────────────
app.use(requestLogger);

// ─────────────────────────── API Routes ──────────────────────────────────────
const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/health`, healthRoutes);

// Future module routes will be added here:
// app.use(`${API_PREFIX}/auth`, authRoutes);
// app.use(`${API_PREFIX}/patients`, patientRoutes);
// app.use(`${API_PREFIX}/doctors`, doctorRoutes);
// app.use(`${API_PREFIX}/appointments`, appointmentRoutes);
// app.use(`${API_PREFIX}/departments`, departmentRoutes);
// app.use(`${API_PREFIX}/prescriptions`, prescriptionRoutes);

// ─────────────────────────── Error Handling ──────────────────────────────────
// 404 catch-all (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last middleware)
app.use(errorHandler);

export default app;
