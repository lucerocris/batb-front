import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarClock, Eye, PackageCheck, PhilippinePeso } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { OrderSummary } from "@/features/admin/orders/types/orders.types.ts";

const statusStyles: Record<OrderSummary["orderStatus"], { label: string; bg: string; color: string; border: string }> = {
    pending: {
        label: "Pending",
        bg: "rgba(254, 240, 138, 0.6)",
        color: "#92400e",
        border: "#fcd34d",
    },
    processing: {
        label: "Processing",
        bg: "rgba(191, 219, 254, 0.65)",
        color: "#1d4ed8",
        border: "#bfdbfe",
    },
    completed: {
        label: "Completed",
        bg: "rgba(187, 247, 208, 0.75)",
        color: "#166534",
        border: "#86efac",
    },
    cancelled: {
        label: "Cancelled",
        bg: "rgba(254, 202, 202, 0.8)",
        color: "#b91c1c",
        border: "#fecaca",
    },
};

const paymentStyles: Record<OrderSummary["paymentStatus"], { label: string; bg: string; color: string }> = {
    paid: { label: "Paid", bg: "rgba(209, 250, 229, 0.8)", color: "#15803d" },
    partially_paid: { label: "Partial", bg: "rgba(254, 249, 195, 0.7)", color: "#a16207" },
    refunded: { label: "Refunded", bg: "rgba(219, 234, 254, 0.8)", color: "#1d4ed8" },
    unpaid: { label: "Unpaid", bg: "rgba(254, 226, 226, 0.8)", color: "#b91c1c" },
};

const orderDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
});

export const orderColumns: ColumnDef<OrderSummary>[] = [
    {
        accessorKey: "orderId",
        id: "orderId",
        header: ({ column }) => (
            <Button variant="ghost" className="h-auto p-0 font-semibold" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Order ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2 font-semibold tracking-tight text-sm">
                <PackageCheck className="h-4 w-4 text-muted-foreground" />
                {row.original.orderId}
            </div>
        ),
        filterFn: (row, id, value) => {
            const query = (value as string)?.toLowerCase() ?? "";
            if (!query) return true;
            const orderId = (row.getValue(id) as string)?.toLowerCase() ?? "";
            const customer = row.original.customerName.toLowerCase();
            return orderId.includes(query) || customer.includes(query);
        },
    },
    {
        accessorKey: "customerName",
        id: "customer",
        header: ({ column }) => (
            <Button variant="ghost" className="h-auto p-0 font-semibold" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Customer
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.original.customerName}</span>
                <span className="text-xs text-muted-foreground">#{row.original.id}</span>
            </div>
        ),
    },
    {
        accessorKey: "items",
        id: "items_total",
        header: "Items / Total",
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{row.original.items} items</span>
                <div className="flex items-center gap-1 font-semibold">
                    <PhilippinePeso className="h-3.5 w-3.5" />
                    <span>{row.original.totalAmount.toLocaleString()}</span>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "orderStatus",
        id: "order_status",
        header: "Order Status",
        cell: ({ row }) => {
            const status = statusStyles[row.original.orderStatus];
            return (
                <Badge
                    variant="secondary"
                    className="font-medium capitalize border"
                    style={{
                        backgroundColor: status.bg,
                        borderColor: status.border,
                        color: status.color,
                    }}
                >
                    {status.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const selected = value as string[];
            if (!selected?.length) return true;
            return selected.includes(row.getValue(id) as string);
        },
    },
    {
        accessorKey: "orderDate",
        id: "order_date",
        header: ({ column }) => (
            <Button variant="ghost" className="h-auto p-0 font-semibold" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Order Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                    {orderDateFormatter.format(new Date(row.original.orderDate))}
                </span>
            </div>
        ),
        sortingFn: (a, b) => new Date(a.original.orderDate).getTime() - new Date(b.original.orderDate).getTime(),
    },
    {
        accessorKey: "paymentStatus",
        id: "payment_status",
        header: "Payment",
        cell: ({ row }) => {
            const status = paymentStyles[row.original.paymentStatus];
            return (
                <Badge
                    variant="secondary"
                    className="font-medium capitalize"
                    style={{
                        backgroundColor: status.bg,
                        color: status.color,
                    }}
                >
                    {status.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            const selected = value as string[];
            if (!selected?.length) return true;
            return selected.includes(row.getValue(id) as string);
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <Button
                size="icon"
                variant="ghost"
                className="size-9"
                title="View Order"
                onClick={() => console.log("View order", row.original.orderId)}
            >
                <Eye className="h-4 w-4" />
            </Button>
        ),
        enableSorting: false,
    },
];

