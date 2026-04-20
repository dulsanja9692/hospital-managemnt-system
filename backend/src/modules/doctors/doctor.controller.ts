// @ts-nocheck
// ──────────────────────────────────────────────────────────────────────────────
// Doctor Controller — thin HTTP handlers for all doctor-related endpoints.
//
// Controllers only:
//   1. Extract data from the request (body, params, query, req.user)
//   2. Call the service layer
//   3. Send the response
// No business logic lives here.
// ──────────────────────────────────────────────────────────────────────────────

import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { AppError } from '../../utils/apiError';
import * as doctorService from './doctor.service';
import type {
  CreateDoctorInput,
  UpdateDoctorInput,
  ListDoctorsQuery,
  CreateFeeInput,
  CreateHospitalChargeInput,
  SetAvailabilityInput,
  CreateExceptionInput,
  ListExceptionsQuery,
} from './doctor.validation';

// ── Helper ───────────────────────────────────────────────────────────────────

function requireUser(req: Request) {
  if (!req.user) throw new AppError('Authentication required.', 401);
  return req.user;
}

// ── Doctor CRUD ──────────────────────────────────────────────────────────────

/** POST /api/v1/doctors */
export const createDoctor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const input = req.body as CreateDoctorInput;

  const doctor = await doctorService.createDoctor(input, user.hospitalId, user.userId);

  sendSuccess({ res, statusCode: 201, message: 'Doctor created successfully', data: doctor });
});

/** GET /api/v1/doctors */
export const listDoctors = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const query = req.query as unknown as ListDoctorsQuery;

  const result = await doctorService.listDoctors(user.hospitalId, query);

  sendSuccess({
    res,
    message: 'Doctors retrieved successfully',
    data: result.data,
    meta: { total: result.total, page: result.page, limit: result.limit },
  });
});

/** GET /api/v1/doctors/:id */
export const getDoctorById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);

  const doctor = await doctorService.getDoctorById(doctorId, user.hospitalId);

  sendSuccess({ res, message: 'Doctor retrieved successfully', data: doctor });
});

/** PUT /api/v1/doctors/:id */
export const updateDoctor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const input = req.body as UpdateDoctorInput;

  const doctor = await doctorService.updateDoctor(doctorId, input, user.hospitalId, user.userId);

  sendSuccess({ res, message: 'Doctor updated successfully', data: doctor });
});

// ── Fees ─────────────────────────────────────────────────────────────────────

/** POST /api/v1/doctors/:id/fees */
export const addDoctorFee = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const input = req.body as CreateFeeInput;

  const fee = await doctorService.addDoctorFee(doctorId, input, user.hospitalId, user.userId);

  sendSuccess({ res, statusCode: 201, message: 'Doctor fee added successfully', data: fee });
});

/** GET /api/v1/doctors/:id/fees */
export const getDoctorFeeHistory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);

  const fees = await doctorService.getDoctorFeeHistory(doctorId, user.hospitalId);

  sendSuccess({ res, message: 'Fee history retrieved successfully', data: fees });
});

// ── Hospital Charges ─────────────────────────────────────────────────────────

/** POST /api/v1/hospital/charges */
export const addHospitalCharge = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const input = req.body as CreateHospitalChargeInput;

  const charge = await doctorService.addHospitalCharge(input, user.hospitalId, user.userId);

  sendSuccess({ res, statusCode: 201, message: 'Hospital charge added successfully', data: charge });
});

/** GET /api/v1/hospital/charges/current */
export const getCurrentHospitalCharge = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);

  const charge = await doctorService.getCurrentHospitalCharge(user.hospitalId);

  sendSuccess({ res, message: 'Current hospital charge retrieved', data: charge });
});

// ── Availability ─────────────────────────────────────────────────────────────

/** POST /api/v1/doctors/:id/availability */
export const setAvailability = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const input = req.body as SetAvailabilityInput;

  const schedule = await doctorService.setAvailability(doctorId, input, user.hospitalId, user.userId);

  sendSuccess({ res, message: 'Availability updated successfully', data: schedule });
});

/** GET /api/v1/doctors/:id/availability */
export const getAvailability = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);

  const schedule = await doctorService.getAvailability(doctorId, user.hospitalId);

  sendSuccess({ res, message: 'Availability retrieved successfully', data: schedule });
});

// ── Exceptions ───────────────────────────────────────────────────────────────

/** POST /api/v1/doctors/:id/exceptions */
export const addException = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const input = req.body as CreateExceptionInput;

  const exception = await doctorService.addException(doctorId, input, user.hospitalId, user.userId);

  sendSuccess({ res, statusCode: 201, message: 'Exception added successfully', data: exception });
});

/** GET /api/v1/doctors/:id/exceptions */
export const getExceptions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const { from, to } = req.query as unknown as ListExceptionsQuery;

  const exceptions = await doctorService.getExceptions(doctorId, user.hospitalId, from, to);

  sendSuccess({ res, message: 'Exceptions retrieved successfully', data: exceptions });
});

/** DELETE /api/v1/doctors/:id/exceptions/:exception_id */
export const removeException = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = requireUser(req);
  const doctorId = String(req.params['id']);
  const exceptionId = String(req.params['exception_id']);

  await doctorService.removeException(doctorId, exceptionId, user.hospitalId, user.userId);

  sendSuccess({ res, message: 'Exception removed successfully' });
});
