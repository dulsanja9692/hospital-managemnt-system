// ──────────────────────────────────────────────────────────────────────────────
// Health Routes — GET /api/v1/health
// ──────────────────────────────────────────────────────────────────────────────

import { Router } from 'express';
import { healthCheck } from './health.controller';

const router = Router();

router.get('/', healthCheck);

export default router;
