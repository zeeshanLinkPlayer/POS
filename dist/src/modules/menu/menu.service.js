"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierService = exports.menuItemService = exports.categoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// --- MenuCategory ---
exports.categoryService = {
    async create(data) { return prisma.menuCategory.create({ data }); },
    async list() { return prisma.menuCategory.findMany({ include: { menuItems: true } }); },
    async get(id) { return prisma.menuCategory.findUnique({ where: { id }, include: { menuItems: true } }); },
    async update(id, data) { return prisma.menuCategory.update({ where: { id }, data }); },
    async remove(id) { return prisma.menuCategory.delete({ where: { id } }); },
};
// --- MenuItem ---
exports.menuItemService = {
    async create(data) {
        const { modifiers, ...itemData } = data;
        return prisma.menuItem.create({
            data: {
                ...itemData,
                modifiers: modifiers
                    ? {
                        create: modifiers.map((m) => ({
                            name: m.name,
                            price: m.price,
                            isActive: m.isActive ?? true,
                        })),
                    }
                    : undefined,
            },
            include: { category: true, },
        });
    },
    async list() {
        return prisma.menuItem.findMany({
            include: { category: true, },
        });
    },
    async get(id) {
        return prisma.menuItem.findUnique({
            where: { id },
            include: { category: true, },
        });
    },
    async update(id, data) {
        const { modifiers, ...itemData } = data;
        return prisma.menuItem.update({
            where: { id },
            data: {
                ...itemData,
                // if modifiers are passed, replace them
                ...(modifiers && {
                    modifiers: {
                        deleteMany: {}, // remove existing
                        create: modifiers.map((m) => ({
                            name: m.name,
                            price: m.price,
                            isActive: m.isActive ?? true,
                        })),
                    },
                }),
            },
            include: { category: true, },
        });
    },
    async remove(id) {
        return prisma.menuItem.delete({ where: { id } });
    },
};
// --- Modifier ---
exports.modifierService = {
    async create(data) {
        const { options, ...modifierData } = data;
        return prisma.modifier.create({
            data: {
                ...modifierData,
                options: {
                    create: options?.map((o) => ({
                        name: o.name,
                        price: o.price,
                        isDefault: o.isDefault ?? false,
                        isActive: o.isActive ?? true,
                    })) ?? [],
                },
            },
            include: { options: true },
        });
    },
    async list() {
        return prisma.modifier.findMany({ include: { options: true } });
    },
    async get(id) {
        return prisma.modifier.findUnique({ where: { id }, include: { options: true } });
    },
    async update(id, data) {
        const { options, ...modifierData } = data;
        return prisma.modifier.update({
            where: { id },
            data: {
                ...modifierData,
                options: options
                    ? {
                        deleteMany: {}, // remove existing options
                        create: options.map((o) => ({
                            name: o.name,
                            price: o.price,
                            isDefault: o.isDefault ?? false,
                            isActive: o.isActive ?? true,
                        })),
                    }
                    : undefined,
            },
            include: { options: true },
        });
    },
    async remove(id) {
        return prisma.modifier.delete({ where: { id } });
    },
};
//# sourceMappingURL=menu.service.js.map