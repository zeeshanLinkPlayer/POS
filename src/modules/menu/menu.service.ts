import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --- MenuCategory ---
export const categoryService = {
  async create(data: any) { return prisma.menuCategory.create({ data }); },
  async list() { return prisma.menuCategory.findMany({ include: { menuItems: true } }); },
  async get(id: string) { return prisma.menuCategory.findUnique({ where: { id }, include: { menuItems: true } }); },
  async update(id: string, data: any) { return prisma.menuCategory.update({ where: { id }, data }); },
  async remove(id: string) { return prisma.menuCategory.delete({ where: { id } }); },
};

// --- MenuItem ---
export const menuItemService = {
    async create(data: any) {
      const { modifiers, ...itemData } = data;
  
      return prisma.menuItem.create({
        data: {
          ...itemData,
          modifiers: modifiers
            ? {
                create: modifiers.map((m: any) => ({
                  name: m.name,
                  price: m.price,
                  isActive: m.isActive ?? true,
                })),
              }
            : undefined,
        },
        include: { category: true,  },
      });
    },
  
    async list() {
      return prisma.menuItem.findMany({
        include: { category: true, },
      });
    },
  
    async get(id: string) {
      return prisma.menuItem.findUnique({
        where: { id },
        include: { category: true, },
      });
    },
  
    async update(id: string, data: any) {
      const { modifiers, ...itemData } = data;
  
      return prisma.menuItem.update({
        where: { id },
        data: {
          ...itemData,
          // if modifiers are passed, replace them
          ...(modifiers && {
            modifiers: {
              deleteMany: {}, // remove existing
              create: modifiers.map((m: any) => ({
                name: m.name,
                price: m.price,
                isActive: m.isActive ?? true,
              })),
            },
          }),
        },
        include: { category: true,  },
      });
    },
  
    async remove(id: string) {
      return prisma.menuItem.delete({ where: { id } });
    },
  };

// --- Modifier ---
export const modifierService = {
  async create(data: any) {
    const { options, ...modifierData } = data;

    return prisma.modifier.create({
      data: {
        ...modifierData,
        options: {
          create: options?.map((o: any) => ({
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

  async get(id: string) {
    return prisma.modifier.findUnique({ where: { id }, include: { options: true } });
  },

  async update(id: string, data: any) {
    const { options, ...modifierData } = data;

    return prisma.modifier.update({
      where: { id },
      data: {
        ...modifierData,
        options: options
          ? {
              deleteMany: {}, // remove existing options
              create: options.map((o: any) => ({
                name: o.name,
                price: o.price,
                isDefault: o.isDefault ?? false,
                isActive: o.isActive ?? true,
              })),
            }
          : undefined,
      },
      include: { options: true   },
    });
  },

  async remove(id: string) {
    return prisma.modifier.delete({ where: { id } });
  },
};