// ──────────────────────────────────────────────────────────────────────────────
// Auth Service — Updated for Dynamic Role Resolution
// ──────────────────────────────────────────────────────────────────────────────

import { AppError } from '../../utils/apiError';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.util';
import * as authRepo from './auth.repository';

// ── Types ────────────────────────────────────────────────────────────────────

interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: string;
    name: string;
    email: string;
    role: string; // We ensure this is the string 'Super Admin', not an object
    hospital_id: string;
  };
}

interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

// ── Service Functions ────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<LoginResult> {
  const user = await authRepo.findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError('Your account has been deactivated.', 403);
  }

  const isPasswordValid = await comparePassword(password, user.password_hash);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  // Ensure we grab the name from the role object
  const roleName = user.role?.name || 'Receptionist';

  const tokenPayload = {
    userId: user.user_id,
    email: user.email,
    role: roleName,
    hospitalId: user.hospital_id,
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  const refreshTokenHash = await hashPassword(refreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await authRepo.createRefreshToken(user.user_id, refreshTokenHash, expiresAt);

  await authRepo.createAuditLog(user.user_id, 'LOGIN', 'USER', user.user_id);

  return {
    accessToken,
    refreshToken,
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: roleName,
      hospital_id: user.hospital_id,
    },
  };
}

export async function refreshToken(oldRefreshToken: string): Promise<RefreshResult> {
  let decoded;
  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch {
    throw new AppError('Invalid or expired refresh token.', 401);
  }

  const storedTokens = await authRepo.findRefreshTokensByUserId(decoded.userId);
  if (storedTokens.length === 0) {
    throw new AppError('Invalid or expired refresh token.', 401);
  }

  let matchedToken = null;
  for (const stored of storedTokens) {
    const isMatch = await comparePassword(oldRefreshToken, stored.token_hash);
    if (isMatch) {
      matchedToken = stored;
      break;
    }
  }

  if (!matchedToken) {
    throw new AppError('Invalid or expired refresh token.', 401);
  }

  if (new Date() > matchedToken.expires_at) {
    await authRepo.deleteRefreshToken(matchedToken.token_id);
    throw new AppError('Refresh token has expired.', 401);
  }

  await authRepo.deleteRefreshToken(matchedToken.token_id);

  const tokenPayload = {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
    hospitalId: decoded.hospitalId,
  };

  const newAccessToken = signAccessToken(tokenPayload);
  const newRefreshToken = signRefreshToken(tokenPayload);

  const newTokenHash = await hashPassword(newRefreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await authRepo.createRefreshToken(decoded.userId, newTokenHash, expiresAt);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

export async function logout(oldRefreshToken: string, userId: string): Promise<void> {
  const storedTokens = await authRepo.findRefreshTokensByUserId(userId);

  for (const stored of storedTokens) {
    const isMatch = await comparePassword(oldRefreshToken, stored.token_hash);
    if (isMatch) {
      await authRepo.deleteRefreshToken(stored.token_id);
      break;
    }
  }
  await authRepo.createAuditLog(userId, 'LOGOUT', 'USER', userId);
}

/**
 * UPDATED: getMe now extracts the role name string correctly
 */
export async function getMe(userId: string) {
  const user = await authRepo.findUserById(userId);
  if (!user) {
    throw new AppError('User not found.', 404);
  }

  // We flatten the role object so the frontend gets a simple string
  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    hospital_id: user.hospital_id,
    status: user.status,
    role: user.role?.name || 'Receptionist', // 👈 This maps Role Object -> String
  };
}