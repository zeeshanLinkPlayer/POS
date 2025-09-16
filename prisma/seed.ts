import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const adminPermissions = [
  'USER_CREATE',
  'USER_READ',
  'USER_UPDATE',
  'USER_DELETE',
  'MANAGER_CREATE',
  'MANAGER_READ',
  'MANAGER_UPDATE',
  'ORDER_CREATE',
  'ORDER_READ',
  'ORDER_UPDATE',
  'ORDER_DELETE',
  'PRODUCT_CREATE',
  'PRODUCT_READ',
  'PRODUCT_UPDATE',
  'PRODUCT_DELETE',
  'MENU_CREATE',
  'MENU_READ',
  'MENU_UPDATE',
  'MENU_DELETE'
];

async function main() {
  console.log('Starting seed...');
  
  // Check if admin already exists
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
    include: { permissions: true }
  });

  if (!adminExists) {
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // First create the user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        role: UserRole.ADMIN,
      },
    });
    
    console.log('Admin user created, adding permissions...');
    
    // Then create the permissions
    await Promise.all(adminPermissions.map(permission => 
      prisma.userPermission.create({
        data: {
          userId: adminUser.id,
          permission: permission as any, // Type assertion needed due to enum
        },
      })
    ));
    
    console.log('Admin user created successfully with all permissions');
  } else {
    console.log('Admin user already exists, checking permissions...');
    
    // Check if all permissions exist
    const existingPermissions = adminExists.permissions.map(p => p.permission);
    const missingPermissions = adminPermissions.filter(
      p => !existingPermissions.includes(p as any)
    );
    
    if (missingPermissions.length > 0) {
      console.log(`Adding ${missingPermissions.length} missing permissions...`);
      
      await Promise.all(missingPermissions.map(permission => 
        prisma.userPermission.create({
          data: {
            userId: adminExists.id,
            permission: permission as any,
          },
        })
      ));
      
      console.log('Added missing permissions');
    } else {
      console.log('All permissions are already set up');
    }
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
