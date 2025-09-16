"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.updateOrderStatusValidator = exports.createOrderValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
// Get enum values as arrays
const orderStatuses = Object.values(client_1.OrderStatus);
const paymentStatuses = Object.values(client_1.PaymentStatus);
const paymentMethods = Object.values(client_1.PaymentMethod);
// Base schema for order items
const orderItemSchema = joi_1.default.object({
    menuItemId: joi_1.default.string().required().messages({
        'string.empty': 'Menu item ID is required',
        'any.required': 'Menu item ID is required'
    }),
    name: joi_1.default.string().required().messages({
        'string.empty': 'Item name is required',
        'any.required': 'Item name is required'
    }),
    price: joi_1.default.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required'
    }),
    taxRate: joi_1.default.number().min(0).max(100).default(0).messages({
        'number.base': 'Tax rate must be a number',
        'number.min': 'Tax rate cannot be negative',
        'number.max': 'Tax rate cannot exceed 100%'
    }),
    total: joi_1.default.number().min(0).optional(),
    notes: joi_1.default.string().optional()
});
// Schema for creating a new order
exports.createOrderValidator = {
    body: joi_1.default.object({
        orderType: joi_1.default.string().valid('DINE_IN', 'TAKEOUT', 'DELIVERY').default('DINE_IN'),
        tableNumber: joi_1.default.string().optional().allow(''),
        customerName: joi_1.default.string().optional().allow(''),
        customerEmail: joi_1.default.string().email({ tlds: { allow: false } }).optional().allow(''),
        customerPhone: joi_1.default.string().optional().allow(''),
        items: joi_1.default.array().items(orderItemSchema).min(1).required().messages({
            'array.min': 'At least one item is required',
            'any.required': 'Order items are required'
        }),
        paymentMethod: joi_1.default.string().valid(...paymentMethods).optional(),
        branchName: joi_1.default.string().required().messages({
            'string.empty': 'Branch name is required',
            'any.required': 'Branch name is required'
        }),
        status: joi_1.default.string().valid(...orderStatuses).default('PENDING'),
        paymentStatus: joi_1.default.string().valid(...paymentStatuses).default('PENDING'),
        notes: joi_1.default.string().optional().allow(''),
        total: joi_1.default.number().min(0).required().messages({
            'number.base': 'Total must be a number',
            'number.min': 'Total must be a positive number',
            'any.required': 'Total is required'
        }),
        subtotal: joi_1.default.number().min(0).required().messages({
            'number.base': 'Subtotal must be a number',
            'number.min': 'Subtotal must be a positive number',
            'any.required': 'Subtotal is required'
        }),
        tax: joi_1.default.number().min(0).default(0).messages({
            'number.base': 'Tax must be a number',
            'number.min': 'Tax cannot be negative'
        }),
        discount: joi_1.default.number().min(0).default(0).messages({
            'number.base': 'Discount must be a number',
            'number.min': 'Discount cannot be negative'
        }),
    })
};
// Schema for updating order status
exports.updateOrderStatusValidator = {
    body: joi_1.default.object({
        status: joi_1.default.string().valid(...orderStatuses).required().messages({
            'any.required': 'Status is required',
            'any.only': `Status must be one of: ${orderStatuses.join(', ')}`
        }),
        notes: joi_1.default.string().optional().allow('')
    }),
    params: joi_1.default.object({
        id: joi_1.default.string().uuid({ version: 'uuidv4' }).required().messages({
            'string.guid': 'Invalid order ID format',
            'any.required': 'Order ID is required'
        })
    })
};
// Validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate each part of the request
            const dataToValidate = {};
            const validationErrors = {};
            // Validate body if schema exists
            if (schema.body) {
                const { error, value } = schema.body.validate(req.body, { abortEarly: false });
                if (error) {
                    validationErrors.body = error.details.map((detail) => detail.message);
                }
                else {
                    dataToValidate.body = value;
                }
            }
            // Validate params if schema exists
            if (schema.params) {
                const { error, value } = schema.params.validate(req.params, { abortEarly: false });
                if (error) {
                    validationErrors.params = error.details.map((detail) => detail.message);
                }
                else {
                    dataToValidate.params = value;
                }
            }
            // Validate query if schema exists
            if (schema.query) {
                const { error, value } = schema.query.validate(req.query, { abortEarly: false });
                if (error) {
                    validationErrors.query = error.details.map((detail) => detail.message);
                }
                else {
                    dataToValidate.query = value;
                }
            }
            // If there are validation errors, return them
            if (Object.keys(validationErrors).length > 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation error',
                    errors: validationErrors
                });
            }
            // Replace request data with validated data
            if (dataToValidate.body)
                req.body = dataToValidate.body;
            if (dataToValidate.params)
                req.params = dataToValidate.params;
            if (dataToValidate.query)
                req.query = dataToValidate.query;
            next();
        }
        catch (error) {
            console.error('Validation error:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error during validation'
            });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=order.validation.js.map