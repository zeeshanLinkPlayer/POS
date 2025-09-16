import { Request, Response } from "express";
import { productService } from "./product.service";
import { ApiResponse, ApiError } from "../../utils/apiResponse";

export const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const product = await productService.createProduct(req.body);
      ApiResponse.send(res, ApiResponse.success(product, "Product created successfully", 201));
    } catch (error: any) {
      const apiError = error instanceof ApiError ? error : ApiError.badRequest(error.message);
      ApiResponse.send(res, new ApiResponse(false, apiError.message, null, apiError.statusCode));
    }
  },

  list: async (_req: Request, res: Response) => {
    try {
      const products = await productService.getProducts();
      ApiResponse.send(res, ApiResponse.success(products, "Products retrieved successfully"));
    } catch (error: any) {
      const apiError = error instanceof ApiError ? error : ApiError.internal("Error retrieving products");
      ApiResponse.send(res, new ApiResponse(false, apiError.message, null, apiError.statusCode));
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const product = await productService.getProduct(req.params.id);
      if (!product) throw ApiError.notFound("Product not found");
      ApiResponse.send(res, ApiResponse.success(product, "Product retrieved successfully"));
    } catch (error: any) {
      const apiError = error instanceof ApiError ? error : ApiError.internal("Error retrieving product");
      ApiResponse.send(res, new ApiResponse(false, apiError.message, null, apiError.statusCode));
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      ApiResponse.send(res, ApiResponse.success(product, "Product updated successfully"));
    } catch (error: any) {
      const apiError = error instanceof ApiError ? error : ApiError.badRequest(error.message);
      ApiResponse.send(res, new ApiResponse(false, apiError.message, null, apiError.statusCode));
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      if (!deleted) throw ApiError.notFound("Product not found");
      ApiResponse.send(res, ApiResponse.success(null, "Product deleted successfully", 200));
    } catch (error: any) {
      const apiError = error instanceof ApiError ? error : ApiError.badRequest(error.message);
      ApiResponse.send(res, new ApiResponse(false, apiError.message, null, apiError.statusCode));
    }
  },
};