// ──────────────────────────────────────────────────────────────────────────────
// Auth Validation Schemas — Zod schemas for auth endpoint inputs.
// ──────────────────────────────────────────────────────────────────────────────

import { z } from 'zod';

/**
 * Login request body schema.
 * - email: must be a valid email address
 * - password: must be at least 1 character (presence check)
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please provide a valid email address')
    .transform((val) => val.toLowerCase().trim()),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
