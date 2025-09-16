"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const product_validations_1 = require("../../middleware/validations/product.validations");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateJWT);
router.get("/", (0, auth_middleware_1.checkPermission)([client_1.Permission.PRODUCT_READ]), product_controller_1.productController.list);
router.get("/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.PRODUCT_READ]), product_controller_1.productController.get);
router.post("/", (0, auth_middleware_1.checkPermission)([client_1.Permission.PRODUCT_CREATE]), (0, auth_middleware_1.validateRequest)({ body: product_validations_1.createProductSchema }), product_controller_1.productController.create);
router.put("/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.PRODUCT_UPDATE]), (0, auth_middleware_1.validateRequest)({ body: product_validations_1.updateProductSchema }), product_controller_1.productController.update);
router.delete("/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.PRODUCT_DELETE]), product_controller_1.productController.remove);
exports.default = router;
//# sourceMappingURL=product.routes.js.map