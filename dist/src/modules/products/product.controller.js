"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const apiResponse_1 = require("../../utils/apiResponse");
exports.productController = {
    create: async (req, res) => {
        try {
            const product = await product_service_1.productService.createProduct(req.body);
            apiResponse_1.ApiResponse.send(res, apiResponse_1.ApiResponse.success(product, "Product created successfully", 201));
        }
        catch (error) {
            const apiError = error instanceof apiResponse_1.ApiError ? error : apiResponse_1.ApiError.badRequest(error.message);
            apiResponse_1.ApiResponse.send(res, new apiResponse_1.ApiResponse(false, apiError.message, null, apiError.statusCode));
        }
    },
    list: async (_req, res) => {
        try {
            const products = await product_service_1.productService.getProducts();
            apiResponse_1.ApiResponse.send(res, apiResponse_1.ApiResponse.success(products, "Products retrieved successfully"));
        }
        catch (error) {
            const apiError = error instanceof apiResponse_1.ApiError ? error : apiResponse_1.ApiError.internal("Error retrieving products");
            apiResponse_1.ApiResponse.send(res, new apiResponse_1.ApiResponse(false, apiError.message, null, apiError.statusCode));
        }
    },
    get: async (req, res) => {
        try {
            const product = await product_service_1.productService.getProduct(req.params.id);
            if (!product)
                throw apiResponse_1.ApiError.notFound("Product not found");
            apiResponse_1.ApiResponse.send(res, apiResponse_1.ApiResponse.success(product, "Product retrieved successfully"));
        }
        catch (error) {
            const apiError = error instanceof apiResponse_1.ApiError ? error : apiResponse_1.ApiError.internal("Error retrieving product");
            apiResponse_1.ApiResponse.send(res, new apiResponse_1.ApiResponse(false, apiError.message, null, apiError.statusCode));
        }
    },
    update: async (req, res) => {
        try {
            const product = await product_service_1.productService.updateProduct(req.params.id, req.body);
            apiResponse_1.ApiResponse.send(res, apiResponse_1.ApiResponse.success(product, "Product updated successfully"));
        }
        catch (error) {
            const apiError = error instanceof apiResponse_1.ApiError ? error : apiResponse_1.ApiError.badRequest(error.message);
            apiResponse_1.ApiResponse.send(res, new apiResponse_1.ApiResponse(false, apiError.message, null, apiError.statusCode));
        }
    },
    remove: async (req, res) => {
        try {
            const deleted = await product_service_1.productService.deleteProduct(req.params.id);
            if (!deleted)
                throw apiResponse_1.ApiError.notFound("Product not found");
            apiResponse_1.ApiResponse.send(res, apiResponse_1.ApiResponse.success(null, "Product deleted successfully", 200));
        }
        catch (error) {
            const apiError = error instanceof apiResponse_1.ApiError ? error : apiResponse_1.ApiError.badRequest(error.message);
            apiResponse_1.ApiResponse.send(res, new apiResponse_1.ApiResponse(false, apiError.message, null, apiError.statusCode));
        }
    },
};
//# sourceMappingURL=product.controller.js.map