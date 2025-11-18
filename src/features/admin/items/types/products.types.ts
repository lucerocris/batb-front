export interface ProductApi {
    id: string;
    categoryID: number;
    name: string;
    description: string;
    shortDescription: string;
    color: string;
    sku: string;
    basePrice: number;
    salePrice: number;
    costPrice: number;
    stockStatus: "available" | "unavailable";
    type: string;
    brand: string;
    imageUrl: string;
    isActive: boolean;
    isFeatured: boolean;
    tags: string;
    createdAt: string;
    category: Category
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    productCount: number;
}