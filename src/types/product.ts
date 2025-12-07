export interface ProductVariant {
    id: number;
    productID: string;
    name: string;
    sku: string;
    priceAdjustment: number;
    reservedQuantity: number;
    attributes: {
        color: string;
    };
    imageUrl: string;
    color: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    sortOrder: number;
    isActive: boolean;
    metaData: unknown | null;
    createdAt: string;
    updatedAt: string;
    productCount: number; 
}

export interface Product {
    id: string;
    categoryID: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    color: string;
    sku: string;
    basePrice: number;
    salePrice: number | null;
    costPrice: number;
    reservedQuantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
    allowBackorder: boolean;
    type: string;
    brand: string;
    imageUrl: string;
    imageGallery?: string[];
    isActive: boolean;
    isFeatured: boolean;
    availableFrom: string;
    availableUntil: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    tags: string;
    purchaseCount: number;
    createdAt: string;
    // Optional stock status from API; may come in various formats
    stockStatus?: string | boolean | null;
    productVariants: ProductVariant[];
    category: Category;
}

export interface ProductsResponse {
    data: Product[];
}
