import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error('Error fetching menu items:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listMenuItems();
