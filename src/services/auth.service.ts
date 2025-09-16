import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth.types';
import { getPermissionsForRole } from '../types/auth.types';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Get permissions based on user role
    const permissions = getPermissionsForRole(user.role);

    // Update user with current permissions (in case they changed)
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { permissions: { set: permissions } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        permissions: updatedUser.permissions,
      } as JwtPayload,
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      user: updatedUser,
      token,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Ensure permissions are up to date with role
    const expectedPermissions = getPermissionsForRole(user.role);
    if (JSON.stringify(user.permissions.sort()) !== JSON.stringify(expectedPermissions.sort())) {
      return this.updateUserPermissions(user.id, expectedPermissions);
    }

    return user;
  }

  private async updateUserPermissions(userId: string, permissions: string[]) {
    return prisma.user.update({
      where: { id: userId },
      data: { permissions: { set: permissions } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
}

export const authService = new AuthService();
