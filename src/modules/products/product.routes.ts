import { Router } from "express";
import { productController } from "./product.controller";
import { authenticateJWT, checkPermission, validateRequest } from "../../middleware/auth.middleware";
import { createProductSchema, updateProductSchema } from "../../middleware/validations/product.validations";
import { Permission } from "@prisma/client";

const router = Router();

router.use(authenticateJWT);

router.get("/", checkPermission([Permission.PRODUCT_READ]), productController.list);
router.get("/:id", checkPermission([Permission.PRODUCT_READ]), productController.get);

router.post(
  "/",
  checkPermission([Permission.PRODUCT_CREATE]),
  validateRequest(createProductSchema),
  productController.create
);

router.put(
  "/:id",
  checkPermission([Permission.PRODUCT_UPDATE]),
  validateRequest(updateProductSchema),
  productController.update
);

router.delete(
  "/:id",
  checkPermission([Permission.PRODUCT_DELETE]),
  productController.remove
);

export default router;