"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = generateOrderNumber;
exports.calculateOrderTotals = calculateOrderTotals;
/**
 * Generates a unique order number in the format ORD-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number
 */
function generateOrderNumber() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${dateStr}-${randomNum}`;
}
/**
 * Calculates order totals including tax
 */
function calculateOrderTotals(items) {
    const subtotal = items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    const tax = items.reduce((sum, item) => {
        const itemTaxRate = item.taxRate || 0;
        return sum + (item.price * item.quantity * (itemTaxRate / 100));
    }, 0);
    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat((subtotal + tax).toFixed(2)),
    };
}
//# sourceMappingURL=order.utils.js.map