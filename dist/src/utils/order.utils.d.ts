/**
 * Generates a unique order number in the format ORD-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number
 */
export declare function generateOrderNumber(): string;
/**
 * Calculates order totals including tax
 */
export declare function calculateOrderTotals(items: Array<{
    price: number;
    quantity: number;
    taxRate?: number;
}>): {
    subtotal: number;
    tax: number;
    total: number;
};
