"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const allowedOrigins = [
    'http://localhost:3000', // Default Next.js dev server
    'http://localhost:3001', // Default backend server
    'http://localhost:4000', // Default backend server
    // Add your production domain here
    // 'https://your-production-domain.com',
];
const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    // Allow requests with no origin (like mobile apps or curl requests)
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }
    // Allow credentials (cookies, authorization headers, etc.)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};
exports.corsMiddleware = corsMiddleware;
//# sourceMappingURL=cors.js.map