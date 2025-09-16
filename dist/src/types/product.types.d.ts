import { Product, ProductCategory, ProductSupplier } from '@prisma/client';
export type ProductCreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> & {
    tags?: string[];
};
export type ProductUpdateInput = Partial<ProductCreateInput>;
export type ProductResponse = Product;
export type ProductListResponse = {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
export { ProductCategory, ProductSupplier };
