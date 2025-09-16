import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productService = {
  async createProduct(data: any) {
    return prisma.product.create({ data });
  },

  async getProducts() {
    return prisma.product.findMany();
  },

  async getProduct(id: string) {
    return prisma.product.findUnique({ where: { id } });
  },

  async updateProduct(id: string, data: any) {
    return prisma.product.update({ where: { id }, data });
  },

  async deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};