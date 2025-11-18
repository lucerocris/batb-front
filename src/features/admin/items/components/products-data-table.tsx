"use client"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { ProductsTableViewOptions } from '@/features/admin/items/components/product-table-view-options.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Filter, Plus, Search } from 'lucide-react';
import { DataTableFacetedFilter } from '@/components/admin/table/data-table-faceted-filter';
import { DataTablePagination } from '@/components/admin/table/data-table-pagination';
import type { ProductApi } from '@/features/admin/items/types/products.types.ts';

interface ProductsDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    stockStatusOptions: { label: string; value: string }[];
    categoryOptions?: { label: string; value: string }[];
    onDelete: (id: string) => void;
    onToggleActive?: (id: string, value: boolean) => void;
}

export function ProductsDataTable<TData extends ProductApi, TValue>({
                                                                        columns,
                                                                        data,
                                                                        stockStatusOptions,
                                                                        categoryOptions = [],
                                                                        onDelete,
                                                                        onToggleActive,
                                                                    }: ProductsDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        meta: { onDelete, onToggleActive },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const hasActiveFilters = table.getState().columnFilters.length > 0;

    const stockStatusFilterOptions = useMemo(
        () => stockStatusOptions,
        [stockStatusOptions]
    );
    const categoryFilterOptions = useMemo(
        () => categoryOptions,
        [categoryOptions]
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col md:flex-row flex-1 items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, brand, or SKU..."
                            value={
                                (table.getColumn('name')?.getFilterValue() as string) ?? ''
                            }
                            onChange={(event) =>
                                table.getColumn('name')?.setFilterValue(event.target.value)
                            }
                            className="h-8 w-full md:w-[200px] lg:w-[300px] pl-8"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {table.getColumn('stock_status') && (
                            <DataTableFacetedFilter
                                column={table.getColumn('stock_status')}
                                title="Stock Status"
                                options={stockStatusFilterOptions}
                            />
                        )}

                        {table.getColumn('category') &&
                            categoryFilterOptions.length > 0 && (
                                <DataTableFacetedFilter
                                    column={table.getColumn('category')}
                                    title="Category"
                                    options={categoryFilterOptions}
                                />
                            )}


                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                onClick={() => table.resetColumnFilters()}
                                className="h-8 px-2 lg:px-3"
                            >
                                Reset
                                <Filter className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <ProductsTableViewOptions table={table} />
                </div>
            </div>

            <div className="rounded-md border">
                <div className="overflow-x-auto scrollbar-thin-white">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="whitespace-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                        className="hover:bg-muted/50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="whitespace-nowrap">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <div className="text-muted-foreground">
                                                No products found.
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add your first product
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DataTablePagination table={table} />
        </div>
    );
}