// ──────────────────────────────────────────────────────────────────────────────
// Database Seed — populates roles, permissions, role-permission mappings,
// a test hospital, and a Super Admin user for development.
//
// Run: npx prisma db seed
// ──────────────────────────────────────────────────────────────────────────────

import { PrismaClient, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ── Seed Data ────────────────────────────────────────────────────────────────

const ROLES = ['Super Admin', 'Hospital Admin', 'Receptionist', 'Doctor', 'Accountant'] as const;

const PERMISSIONS = [
  'create_appointment',
  'register_patient',
  'manage_payments',
  'view_reports',
  'manage_doctors',
  'manage_users',
  'manage_system',
] as const;

/**
 * Role → Permissions mapping.
 * Super Admin gets everything; others get a scoped subset.
 */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Super Admin': [...PERMISSIONS],
  'Hospital Admin': [
    'create_appointment',
    'register_patient',
    'manage_payments',
    'view_reports',
    'manage_doctors',
    'manage_users',
  ],
  Receptionist: ['create_appointment', 'register_patient'],
  Doctor: ['create_appointment', 'view_reports'],
  Accountant: ['manage_payments', 'view_reports'],
};

// ── Main Seed Function ───────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🌱 Seeding database...\n');

  // 1) Roles
  console.log('  → Seeding roles...');
  for (const roleName of ROLES) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // 2) Permissions
  console.log('  → Seeding permissions...');
  for (const permName of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: permName },
      update: {},
      create: { name: permName },
    });
  }

  // 3) Role-Permission mappings
  console.log('  → Seeding role-permission mappings...');
  const allRoles = await prisma.role.findMany();
  const allPermissions = await prisma.permission.findMany();

  for (const [roleName, permNames] of Object.entries(ROLE_PERMISSIONS)) {
    const role = allRoles.find((r) => r.name === roleName);
    if (!role) continue;

    for (const permName of permNames) {
      const permission = allPermissions.find((p) => p.name === permName);
      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          role_id_permission_id: {
            role_id: role.role_id,
            permission_id: permission.permission_id,
          },
        },
        update: {},
        create: {
          role_id: role.role_id,
          permission_id: permission.permission_id,
        },
      });
    }
  }

  // 4) Test Hospital
  console.log('  → Seeding test hospital...');
  const hospital = await prisma.hospital.upsert({
    where: { hospital_id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      hospital_id: '00000000-0000-0000-0000-000000000001',
      name: 'City General Hospital',
      address: '123 Medical Drive, Colombo 07',
      contact_number: '+94 11 234 5678',
    },
  });

  // 5) Super Admin user
  console.log('  → Seeding Super Admin user...');
  const superAdminRole = allRoles.find((r) => r.name === 'Super Admin');
  if (superAdminRole) {
    const passwordHash = await bcrypt.hash('Admin@123', 12);

    await prisma.user.upsert({
      where: { email: 'admin@hospital.com' },
      update: {},
      create: {
        hospital_id: hospital.hospital_id,
        role_id: superAdminRole.role_id,
        name: 'System Administrator',
        email: 'admin@hospital.com',
        password_hash: passwordHash,
        status: UserStatus.ACTIVE,
      },
    });
  }

  console.log('\n✅ Seed completed successfully!');
}

// ── Run ──────────────────────────────────────────────────────────────────────

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
