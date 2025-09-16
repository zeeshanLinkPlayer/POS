"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listMenuItems() {
    try {
        const menuItems = await prisma.menuItem.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: true
            },
            take: 10 // Get first 10 items
        });
        console.log('Available Menu Items:');
        console.table(menuItems);
    }
    catch (error) {
        console.error('Error fetching menu items:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
listMenuItems();
//# sourceMappingURL=list-menu-items.js.map