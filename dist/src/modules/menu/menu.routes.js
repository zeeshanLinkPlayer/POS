"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("./menu.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const menu_validation_1 = require("../../middleware/validations/menu.validation");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateJWT);
// --- Categories ---
router.get("/categories", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.categoryController.list);
router.get("/categories/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.categoryController.get);
router.post("/categories", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_CREATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.createCategorySchema }), menu_controller_1.categoryController.create);
router.put("/categories/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_UPDATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.updateCategorySchema }), menu_controller_1.categoryController.update);
router.delete("/categories/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_DELETE]), menu_controller_1.categoryController.remove);
// --- MenuItems ---
router.get("/items", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.menuItemController.list);
router.get("/items/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.menuItemController.get);
router.post("/items", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_CREATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.createMenuItemSchema }), menu_controller_1.menuItemController.create);
router.put("/items/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_UPDATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.updateMenuItemSchema }), menu_controller_1.menuItemController.update);
router.delete("/items/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_DELETE]), menu_controller_1.menuItemController.remove);
// --- Modifiers ---
router.get("/modifiers", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.modifierController.list);
router.get("/modifiers/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_READ]), menu_controller_1.modifierController.get);
router.post("/modifiers", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_CREATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.createModifierSchema }), menu_controller_1.modifierController.create);
router.put("/modifiers/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_UPDATE]), (0, auth_middleware_1.validateRequest)({ body: menu_validation_1.updateModifierSchema }), menu_controller_1.modifierController.update);
router.delete("/modifiers/:id", (0, auth_middleware_1.checkPermission)([client_1.Permission.MENU_DELETE]), menu_controller_1.modifierController.remove);
exports.default = router;
//# sourceMappingURL=menu.routes.js.map