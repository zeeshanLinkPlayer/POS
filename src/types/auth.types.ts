import { UserRole, Permission } from '@prisma/client';

// Re-export the Permission type for consistency
export { Permission };

export type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  iat?: number;
  exp?: number;
};

export type RequestWithUser = Request & {
  user: JwtPayload;
};

type RolePermissionsType = Record<UserRole, Permission[]>;

// Helper to get all permissions for a role
export const getPermissionsForRole = (role: UserRole): Permission[] => {
  const permissions: Permission[] = [];
  
  // Base permissions for all roles
  const basePermissions: Permission[] = [
    'USER_READ',  // All users can view their own profile
  ];

  // Role-specific permissions
  const rolePermissions: Record<UserRole, Permission[]> = {
    [UserRole.ADMIN]: [
      ...basePermissions,
      'USER_CREATE',
      'USER_UPDATE',
      'USER_DELETE',
      'MANAGER_CREATE',
      'MANAGER_READ',
      'MANAGER_UPDATE',
      'MENU_CREATE',
      'MENU_READ',
      'MENU_UPDATE',
      'MENU_DELETE',
      'ORDER_CREATE',
      'ORDER_READ',
      'ORDER_UPDATE',
      'ORDER_DELETE',
      'PRODUCT_READ',
    ],
    [UserRole.MANAGER]: [
      ...basePermissions,
      'USER_READ',
      'USER_UPDATE',
      'MENU_CREATE',
      'MENU_READ',
      'MENU_UPDATE',
      'MENU_DELETE',
      'ORDER_CREATE',
      'ORDER_READ',
      'ORDER_UPDATE',
      'ORDER_DELETE',
      'PRODUCT_READ',
    ],
    [UserRole.USER]: basePermissions,
  };

  return rolePermissions[role] || [];
};

export const RolePermissions: RolePermissionsType = {
  [UserRole.ADMIN]: getPermissionsForRole(UserRole.ADMIN),
  [UserRole.MANAGER]: getPermissionsForRole(UserRole.MANAGER),
  [UserRole.USER]: getPermissionsForRole(UserRole.USER),
};

// Helper function to check if user has required permissions
export const hasPermission = (user: JwtPayload, requiredPermissions: Permission[]): boolean => {
  if (user.role === UserRole.ADMIN) return true;
  
  if (!user.permissions) return false;
  console.log(user,"user")
  return requiredPermissions.every(permission => 
  {
    console.log(permission,"permission")
    console.log(user.permissions,"user.permissions")
    console.log(user.permissions.includes(permission),"user.permissions.includes(permission)")
    const isPermissionValid=user.permissions.includes(permission)
    console.log(isPermissionValid,"isPermissionValid")

    return (user.permissions as string[]).includes(permission)
  }
  );
};
