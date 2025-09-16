import Joi from "joi";

// Step 1: Basic
const basicInfoSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  barcode: Joi.string().allow(""),
  category: Joi.string().required(),
  supplier: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()).optional(),
});

// Step 2: Pricing
const pricingSchema = Joi.object({
  costPrice: Joi.number().required(),
  salePrice: Joi.number().required(),
  takeawayPrice: Joi.number().optional(),
  retailPrice: Joi.number().optional(),
  taxRate: Joi.number().required(),
  takeawayTaxRate: Joi.number().optional(),
  taxExempt: Joi.boolean().default(false),
});

// Step 3: Till Settings
const tillSchema = Joi.object({
  tillOrder: Joi.number().default(0),
  sellOnTill: Joi.boolean().default(true),
  active: Joi.boolean().default(true),
});

// Combine for final create
export const createProductSchema = basicInfoSchema.concat(pricingSchema).concat(tillSchema);

// Update product schema
export const updateProductSchema = createProductSchema.fork(
  Object.keys(createProductSchema.describe().keys),
  (field) => field.optional()
);
