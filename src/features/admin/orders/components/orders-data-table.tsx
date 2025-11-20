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
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { OrdersTableViewOptions } from "@/features/admin/orders/components/orders-table-view-options.tsx";
import { DataTableFacetedFilter } from "@/components/admin/table/data-table-faceted-filter.tsx";
import { DataTablePagination } from "@/components/admin/table/data-table-pagination.tsx";
import type { OrderSummary } from "@/features/admin/orders/types/orders.types.ts";

interface OrdersDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    statusOptions: { label: string; value: string }[];
    paymentOptions: { label: string; value: string }[];
}

export function OrdersDataTable<TData extends OrderSummary, TValue>({
    columns,
    data,
    statusOptions,
    paymentOptions,
}: OrdersDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    const computedStatusOptions = useMemo(() => statusOptions, [statusOptions]);
    const computedPaymentOptions = useMemo(() => paymentOptions, [paymentOptions]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col md:flex-row flex-1 items-start md:items-center gap-3">
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search orders by ID or customer..."
                            value={(table.getColumn("orderId")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("orderId")?.setFilterValue(event.target.value)
                            }
                            className="h-9 w-full md:w-[280px] lg:w-[320px] pl-8"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {table.getColumn("order_status") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("order_status")}
                                title="Order Status"
                                options={computedStatusOptions}
                            />
                        )}
                        {table.getColumn("payment_status") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("payment_status")}
                                title="Payment"
                                options={computedPaymentOptions}
                            />
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <OrdersTableViewOptions table={table} />
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
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-muted/50">
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="whitespace-nowrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                                        No orders found.
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



