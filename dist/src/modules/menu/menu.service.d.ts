export declare const categoryService: {
    create(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
    }>;
    list(): Promise<({
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            tags: string[];
            taxRate: number;
            taxExempt: boolean;
            categoryId: string;
            imageUrl: string | null;
            isActive: boolean;
            price: number;
            cost: number | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
    })[]>;
    get(id: string): Promise<({
        menuItems: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            tags: string[];
            taxRate: number;
            taxExempt: boolean;
            categoryId: string;
            imageUrl: string | null;
            isActive: boolean;
            price: number;
            cost: number | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
    }>;
};
export declare const menuItemService: {
    create(data: any): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        tags: string[];
        taxRate: number;
        taxExempt: boolean;
        categoryId: string;
        imageUrl: string | null;
        isActive: boolean;
        price: number;
        cost: number | null;
    }>;
    list(): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        tags: string[];
        taxRate: number;
        taxExempt: boolean;
        categoryId: string;
        imageUrl: string | null;
        isActive: boolean;
        price: number;
        cost: number | null;
    })[]>;
    get(id: string): Promise<({
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        tags: string[];
        taxRate: number;
        taxExempt: boolean;
        categoryId: string;
        imageUrl: string | null;
        isActive: boolean;
        price: number;
        cost: number | null;
    }) | null>;
    update(id: string, data: any): Promise<{
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            imageUrl: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        tags: string[];
        taxRate: number;
        taxExempt: boolean;
        categoryId: string;
        imageUrl: string | null;
        isActive: boolean;
        price: number;
        cost: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        tags: string[];
        taxRate: number;
        taxExempt: boolean;
        categoryId: string;
        imageUrl: string | null;
        isActive: boolean;
        price: number;
        cost: number | null;
    }>;
};
export declare const modifierService: {
    create(data: any): Promise<{
        options: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            price: number;
            modifierId: string;
            isDefault: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
    list(): Promise<({
        options: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            price: number;
            modifierId: string;
            isDefault: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    })[]>;
    get(id: string): Promise<({
        options: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            price: number;
            modifierId: string;
            isDefault: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }) | null>;
    update(id: string, data: any): Promise<{
        options: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            price: number;
            modifierId: string;
            isDefault: boolean;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        isActive: boolean;
        type: string;
        isRequired: boolean;
        minSelection: number;
        maxSelection: number;
    }>;
};
