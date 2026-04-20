// ──────────────────────────────────────────────────────────────────────────────
// Patient Validation — Zod schemas for patient endpoint inputs.
// ──────────────────────────────────────────────────────────────────────────────

import { z } from 'zod';

/**
 * POST /api/v1/patients — create a new patient.
 *
 * - name, nic, phone are required
 * - email is optional but must be valid if provided
 * - profile fields (address, emergency_contact, gender, age) are optional
 */
export const createPatientSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters'),
  nic: z
    .string({ required_error: 'NIC is required' })
    .min(1, 'NIC is required'),
  phone: z
    .string({ required_error: 'Phone is required' })
    .min(1, 'Phone is required'),
  email: z
    .string()
    .email('Please provide a valid email address')
    .optional()
    .or(z.literal('')),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
  gender: z
    .enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Gender must be Male, Female, or Other' }),
    })
    .optional(),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be at least 0')
    .max(120, 'Age must be at most 120')
    .optional(),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;

/**
 * PUT /api/v1/patients/:id — update patient details.
 *
 * - NIC is NOT updatable after registration
 * - All fields are optional (partial update)
 */
export const updatePatientSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .optional(),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .optional(),
  email: z
    .string()
    .email('Please provide a valid email address')
    .optional()
    .or(z.literal('')),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
  gender: z
    .enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Gender must be Male, Female, or Other' }),
    })
    .optional(),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(0, 'Age must be at least 0')
    .max(120, 'Age must be at most 120')
    .optional(),
});

export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;

/**
 * GET /api/v1/patients — query params for search + pagination.
 */
export const listPatientsQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListPatientsQuery = z.infer<typeof listPatientsQuerySchema>;

/**
 * Route params with patient ID.
 */
export const patientIdParamSchema = z.object({
  id: z.string().uuid('Invalid patient ID format'),
});
