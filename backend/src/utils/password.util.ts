// ──────────────────────────────────────────────────────────────────────────────
// Password Utilities — bcrypt hashing and comparison.
// ──────────────────────────────────────────────────────────────────────────────

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password using bcrypt.
 * @param plainPassword - The plaintext password to hash.
 * @returns The bcrypt hash string.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compare a plaintext password against a bcrypt hash.
 * @param plainPassword - The plaintext password to check.
 * @param hashedPassword - The bcrypt hash to compare against.
 * @returns True if the password matches the hash.
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
