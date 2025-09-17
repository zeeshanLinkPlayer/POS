import app from "./app";
import config from "./src/config";
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const port = 8080;

async function ensureAdminUser() {
  try {
    // Check if admin user already exists
    const adminExists = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com',
        role: UserRole.ADMIN
      }
    });

    if (!adminExists) {
      console.log('No admin user found. Creating one...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Create admin user
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          role: UserRole.ADMIN,
          name: 'Admin User'
        }
      });

      // Add all permissions to admin
      const permissions = Object.values(Permission);
      await Promise.all(
        permissions.map(permission =>
          prisma.userPermission.create({
            data: {
              userId: adminUser.id,
              permission: permission
            }
          })
        )
      );

      console.log('Admin user created successfully with all permissions');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error ensuring admin user:', error);
  }
}

// Start the server
async function startServer() {
  try {
    // Ensure admin user exists
    await ensureAdminUser();
    
    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Import Permission enum after prisma client is initialized
import { Permission } from '@prisma/client';

// Start the application
startServer();
