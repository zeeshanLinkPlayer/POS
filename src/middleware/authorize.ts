import { Request, Response, NextFunction } from 'express';

type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';

export const authorize = (roles: UserRole | UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user in request' });
    }

    const userRoles = Array.isArray(roles) ? roles : [roles];
    
    // Check if user has one of the required roles
    if (!userRoles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ 
        message: `Forbidden: Requires one of these roles: ${userRoles.join(', ')}` 
      });
    }

    next();
  };
};
