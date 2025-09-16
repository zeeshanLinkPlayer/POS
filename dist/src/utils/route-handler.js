"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteHandler = void 0;
const createRouteHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.createRouteHandler = createRouteHandler;
//# sourceMappingURL=route-handler.js.map