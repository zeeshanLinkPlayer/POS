"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.productService = {
    async createProduct(data) {
        return prisma.product.create({ data });
    },
    async getProducts() {
        return prisma.product.findMany();
    },
    async getProduct(id) {
        return prisma.product.findUnique({ where: { id } });
    },
    async updateProduct(id, data) {
        return prisma.product.update({ where: { id }, data });
    },
    async deleteProduct(id) {
        return prisma.product.delete({ where: { id } });
    },
};
//# sourceMappingURL=product.service.js.map