import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import AdminPageHeader from "@/components/admin/layout/AdminPageHeader.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useMemo} from "react";
import {useProducts} from "@/hooks/useProducts.ts";
import {ProductsDataTable} from "@/features/admin/items/components/products-data-table.tsx";
import {productColumns} from "@/features/admin/items/components/product-columns.tsx";
import type {ProductApi} from "@/features/admin/items/types/products.types.ts";
import type { Product } from "@/types/product";

function normalizeStockStatus(p: Product): "available" | "unavailable" {
    const apiVal = p.stockStatus;
    if (apiVal !== undefined && apiVal !== null) {
        if (typeof apiVal === "boolean") {
            return apiVal ? "available" : "unavailable";
        }
        const s = String(apiVal).toLowerCase().trim();
        if (["available", "in_stock", "in stock", "true", "1", "yes"].includes(s)) return "available";
        if (["unavailable", "out_of_stock", "out of stock", "false", "0", "no"].includes(s)) return "unavailable";
        // if numeric-like
        const num = Number(s);
        if (!Number.isNaN(num)) return num > 0 ? "available" : "unavailable";
    }
    // Fallback: compute from quantities
    return (p.stockQuantity - p.reservedQuantity) > 0 ? "available" : "unavailable";
}

export default function ItemsPage() {
    const { products, loading, error } = useProducts();

    // Map API products to the table's expected shape (ProductApi)
    const tableData: ProductApi[] = useMemo(() => {
        return (products ?? []).map((p) => ({
            id: p.id,
            categoryID: p.categoryID,
            name: p.name,
            description: p.description,
            shortDescription: p.shortDescription,
            color: p.color,
            sku: p.sku,
            basePrice: p.basePrice,
            salePrice: p.salePrice ?? p.basePrice,
            costPrice: p.costPrice,
            stockStatus: normalizeStockStatus(p),
            type: p.type,
            brand: p.brand,
            imageUrl: p.imageUrl,
            isActive: p.isActive,
            isFeatured: p.isFeatured,
            tags: p.tags,
            createdAt: p.createdAt,
            category: {
                id: p.category.id,
                name: p.category.name,
                slug: p.category.slug,
                description: p.category.description,
                imageUrl: p.category.imageUrl ?? "",
                isActive: p.category.isActive,
                createdAt: p.category.createdAt,
                updatedAt: p.category.updatedAt,
                productCount: p.category.productCount,
            },
        }));
    }, [products]);

    const stockStatusOptions = useMemo(
        () => [
            { label: "Available", value: "available" },
            { label: "Unavailable", value: "unavailable" },
        ],
        []
    );

    const categoryOptions = useMemo(() => {
        const set = new Set<string>();
        tableData.forEach((p) => p.category?.name && set.add(p.category.name));
        return Array.from(set).map((name) => ({ label: name, value: name }));
    }, [tableData]);

    const handleDelete = async (id: string) => {
        // Optional: integrate with your API, then trigger a refresh afterward
        console.log("Delete product", id);
    };

    const handleToggleActive = async (id: string, value: boolean) => {
        // Optional: integrate with your API, then trigger a refresh afterward
        console.log("Toggle active", { id, value });
    };

    return (
        <>
            <div className="flex flex-col flex-1 min-h-screen gap-6">
                <AdminPageHeader
                    title="Products"
                    subtitle="Products overview"
                    actions={
                        <div className="flex gap-2">
                            <Button>
                                <Plus className="h-4 w-4 mr-2"/>
                                Add Product
                            </Button>
                            <Button variant={"outline"}>
                                <Plus className="h-4 w-4 mr-2"/>
                                Add Widget
                            </Button>
                        </div>

                    }
                />

                <div className="grid grid-cols-3 gap-6 flex-1">

                    {/* Table */}
                    <Card className="col-span-2 w-full h-full p-4">
                        {loading && (
                            <div className="text-sm text-muted-foreground">Loading products...</div>
                        )}
                        {error && !loading && (
                            <div className="text-sm text-red-600">{error}</div>
                        )}
                        {!loading && !error && (
                            <ProductsDataTable
                                columns={productColumns}
                                data={tableData}
                                stockStatusOptions={stockStatusOptions}
                                categoryOptions={categoryOptions}
                                onDelete={handleDelete}
                                onToggleActive={handleToggleActive}
                            />
                        )}
                    </Card>
                    <div className="flex w-full flex-col gap-6 h-full">
                        <Card className="w-full flex-1">

                        </Card>
                        <Card className="w-full flex-1">

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}