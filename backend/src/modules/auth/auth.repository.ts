// ──────────────────────────────────────────────────────────────────────────────
// Auth Repository — all database queries for authentication.
//
// Only this file touches Prisma for auth-related data.
// No business logic here — just data access.
// ──────────────────────────────────────────────────────────────────────────────

import { prisma } from '../../config/database';

/**
 * Find a user by email, including their role.
 * @param email - The user's email address.
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
}

/**
 * Find a user by ID, including role and hospital.
 * Excludes password_hash from the result.
 * @param userId - The user's UUID.
 */
export async function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: { user_id: userId },
    select: {
      user_id: true,
      name: true,
      email: true,
      status: true,
      hospital_id: true,
      created_at: true,
      role: { select: { role_id: true, name: true } },
      hospital: { select: { hospital_id: true, name: true } },
    },
  });
}

/**
 * Store a hashed refresh token in the database.
 * @param userId - The user's UUID.
 * @param tokenHash - The bcrypt hash of the refresh token.
 * @param expiresAt - When the token expires.
 */
export async function createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
  return prisma.refreshToken.create({
    data: {
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
    },
  });
}

/**
 * Find all refresh tokens for a user (for comparison during refresh).
 * @param userId - The user's UUID.
 */
export async function findRefreshTokensByUserId(userId: string) {
  return prisma.refreshToken.findMany({
    where: { user_id: userId },
    include: {
      user: {
        include: { role: true },
      },
    },
  });
}

/**
 * Delete a specific refresh token by its ID.
 * @param tokenId - The refresh token's UUID.
 */
export async function deleteRefreshToken(tokenId: string) {
  return prisma.refreshToken.delete({
    where: { token_id: tokenId },
  });
}

/**
 * Delete all refresh tokens for a user (e.g., on logout-all or account compromise).
 * @param userId - The user's UUID.
 */
export async function deleteAllRefreshTokensForUser(userId: string) {
  return prisma.refreshToken.deleteMany({
    where: { user_id: userId },
  });
}

/**
 * Write an entry to the audit log.
 * @param userId - The acting user's UUID.
 * @param action - What action was performed (e.g., 'LOGIN', 'LOGOUT').
 * @param entity - The entity type affected (e.g., 'USER', 'SESSION').
 * @param entityId - The specific entity ID, if applicable.
 */
export async function createAuditLog(
  userId: string,
  action: string,
  entity: string,
  entityId?: string,
) {
  return prisma.auditLog.create({
    data: {
      user_id: userId,
      action,
      entity,
      entity_id: entityId ?? null,
    },
  });
}
