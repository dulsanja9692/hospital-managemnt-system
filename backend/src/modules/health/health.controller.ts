// ──────────────────────────────────────────────────────────────────────────────
// Health Controller — provides health-check and readiness endpoints.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

export const healthCheck = (_req: Request, res: Response): void => {
  sendSuccess({
    res,
    message: 'OK',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env['NODE_ENV'] ?? 'development',
      memoryUsage: {
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
      },
    },
  });
};
