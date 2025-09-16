"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Step 1: Basic
const basicInfoSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().allow(""),
    barcode: joi_1.default.string().allow(""),
    category: joi_1.default.string().required(),
    supplier: joi_1.default.string().allow(""),
    tags: joi_1.default.array().items(joi_1.default.string()).optional(),
});
// Step 2: Pricing
const pricingSchema = joi_1.default.object({
    costPrice: joi_1.default.number().required(),
    salePrice: joi_1.default.number().required(),
    takeawayPrice: joi_1.default.number().optional(),
    retailPrice: joi_1.default.number().optional(),
    taxRate: joi_1.default.number().required(),
    takeawayTaxRate: joi_1.default.number().optional(),
    taxExempt: joi_1.default.boolean().default(false),
});
// Step 3: Till Settings
const tillSchema = joi_1.default.object({
    tillOrder: joi_1.default.number().default(0),
    sellOnTill: joi_1.default.boolean().default(true),
    active: joi_1.default.boolean().default(true),
});
// Combine for final create
exports.createProductSchema = basicInfoSchema.concat(pricingSchema).concat(tillSchema);
// Update product schema
exports.updateProductSchema = exports.createProductSchema.fork(Object.keys(exports.createProductSchema.describe().keys), (field) => field.optional());
//# sourceMappingURL=product.validations.js.map