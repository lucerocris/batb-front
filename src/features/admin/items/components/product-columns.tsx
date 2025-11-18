import type { ColumnDef } from '@tanstack/react-table';
import {
    ArrowUpDown,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    PackageOpen,
    PhilippinePeso,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import type { ProductApi } from '@/features/admin/items/types/products.types.ts';

const stockStatusConfig = {
    available: {
        variant: 'secondary' as const,
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#bbf7d0',
        label: 'Available',
    },
    unavailable: {
        variant: 'secondary' as const,
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        borderColor: '#fecaca',
        label: 'Unavailable',
    },
};

export const productColumns: ColumnDef<ProductApi>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 32,
    },
    {
        accessorKey: 'imageUrl',
        id: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex items-center justify-center">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover border"
                        />
                    ) : (
                        <div className="h-12 w-12 rounded border flex items-center justify-center bg-muted">
                            <PackageOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                    )}
                </div>
            );
        },
        enableSorting: false,
        size: 80,
    },
    {
        accessorKey: 'sku',
        id: 'sku',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-auto p-0 font-semibold"
            >
                SKU
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="pl-3 min-w-[120px]">
                <span className="font-mono text-sm">{row.getValue('sku')}</span>
            </div>
        ),
        sortingFn: (a, b) => a.original.sku.localeCompare(b.original.sku),
    },
    {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-auto p-0 font-semibold"
            >
                Product
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex flex-col min-w-[200px] pl-3">
                    <span className="font-medium leading-tight">{product.name}</span>
                    {product.brand && (
                        <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
                    )}
                </div>
            );
        },
        sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
        filterFn: (row, id, value) => {
            const name = (row.getValue(id) as string) ?? '';
            const brand = row.original.brand ?? '';
            const sku = row.original.sku ?? '';
            const q = (value as string)?.toLowerCase() ?? '';
            return (
                name.toLowerCase().includes(q) ||
                brand.toLowerCase().includes(q) ||
                sku.toLowerCase().includes(q)
            );
        },
    },
    {
        accessorKey: 'category',
        id: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const categoryName = row.original.category?.name;

            if (!categoryName) {
                return (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm italic">Uncategorized</span>
                    </div>
                );
            }

            return (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{categoryName}</span>
                </div>
            );
        },
        enableSorting: false,
        filterFn: (row, _id, value) => {
            const name = row.original.category?.name ?? '';
            const selected = value as string[];
            return selected.length === 0 || selected.includes(name);
        },
    },
    {
        accessorKey: 'salePrice',
        id: 'price',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="h-auto p-0 font-semibold"
            >
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const salePrice = row.original.salePrice ?? 0;

            return (
                <div className="flex items-center gap-1 pl-3 min-w-[100px]">
                    <PhilippinePeso className="h-3.5 w-3.5" />
                    <span className="font-medium">{salePrice.toLocaleString()}</span>
                </div>
            );
        },
        sortingFn: (a, b) =>
            (a.original.salePrice ?? 0) - (b.original.salePrice ?? 0),
    },
    {
        accessorKey: 'stockStatus',
        id: 'stock_status',
        header: 'Stock Status',
        cell: ({ row }) => {
            const status = row.getValue('stock_status') as 'available' | 'unavailable';
            const cfg = stockStatusConfig[status] ?? stockStatusConfig.unavailable;

            return (
                <Badge
                    variant={cfg.variant}
                    style={{
                        backgroundColor: cfg.backgroundColor,
                        color: cfg.color,
                        borderColor: cfg.borderColor,
                        border: '1px solid',
                    }}
                    className="font-medium"
                >
                    {cfg.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const status = row.getValue(id) as string;
            return (value as string[]).includes(status);
        },
    },
    {
        accessorKey: 'isActive',
        id: 'is_active',
        header: 'Active',
        cell: ({ row, table }) => {
            const isActive = row.getValue('is_active') as boolean;
            const onToggleActive = table.options.meta?.onToggleActive as
                | ((id: string, value: boolean) => void)
                | undefined;

            return (
                <div className="pl-3">
                    <Switch
                        checked={isActive}
                        onCheckedChange={(value) => onToggleActive?.(row.original.id, value)}
                    />
                </div>
            );
        },
        enableSorting: false,
    },
    {
        id: 'actions',
        cell: ({ row, table }) => {
            const product = row.original;
            const onDelete = table.options.meta?.onDelete as
                | ((id: string) => void)
                | undefined;

            return (
                <div className="flex items-center gap-1 justify-end">
                    <Button variant="ghost" className="size-8 p-0" title="View">
                        <Eye className="size-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    window.location.href = `/admin/products/${product.id}/edit`;
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete?.(product.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];