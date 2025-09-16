"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user in request' });
        }
        const userRoles = Array.isArray(roles) ? roles : [roles];
        // Check if user has one of the required roles
        if (!userRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden: Requires one of these roles: ${userRoles.join(', ')}`
            });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map