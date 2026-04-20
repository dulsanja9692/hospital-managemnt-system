// ──────────────────────────────────────────────────────────────────────────────
// Zod Validation Middleware — validates request body, params, or query
// against a Zod schema before the handler executes.
//
// Usage:
//   router.post('/patients', validate(createPatientSchema), patientController.create);
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response, NextFunction } from 'express';
import { type AnyZodObject, type ZodError, ZodSchema } from 'zod';
import { sendError } from '../utils/apiResponse';

interface ValidationSchemas {
  body?: ZodSchema;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as typeof req.params;
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as typeof req.query;
      }
      next();
    } catch (error) {
      const zodError = error as ZodError;
      zodError.errors.forEach((e) => {
        errors.push(`${e.path.join('.')}: ${e.message}`);
      });
      sendError({
        res,
        statusCode: 422,
        message: 'Validation failed',
        errors,
      });
    }
  };
};
