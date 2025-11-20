import { useMemo } from "react";
import { Button } from "@/components/ui/button.tsx";
import AdminPageHeader from "@/components/admin/layout/AdminPageHeader.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { OrdersDataTable } from "@/features/admin/orders/components/orders-data-table.tsx";
import { orderColumns } from "@/features/admin/orders/components/order-columns.tsx";
import { sampleOrders } from "@/features/admin/orders/data/sample-orders.ts";
import type { OrderSummary } from "@/features/admin/orders/types/orders.types.ts";
import { CalendarCheck, ClipboardCheck, ListChecks, ShoppingBag } from "lucide-react";

const summaryCards = [
    {
        title: "Total Orders Today",
        value: "124",
        helper: "+12% vs yesterday",
        icon: ShoppingBag,
    },
    {
        title: "Orders This Month",
        value: "2,348",
        helper: "On track to hit goal",
        icon: CalendarCheck,
    },
    {
        title: "Pending Orders",
        value: "32",
        helper: "Awaiting fulfillment",
        icon: ListChecks,
    },
    {
        title: "Completed Orders",
        value: "1,972",
        helper: "Last 30 days",
        icon: ClipboardCheck,
    },
];

export default function OrdersPage() {
    const orders = sampleOrders;

    const statusOptions = useMemo(
        () => [
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
        ],
        [],
    );

    const paymentOptions = useMemo(
        () => [
            { label: "Paid", value: "paid" },
            { label: "Partial", value: "partially_paid" },
            { label: "Refunded", value: "refunded" },
            { label: "Unpaid", value: "unpaid" },
        ],
        [],
    );

    return (
        <div className="flex flex-col flex-1 min-h-screen gap-6">
            <AdminPageHeader
                title="Orders"
                subtitle="Monitor and manage storefront orders"
                actions={
                    <div className="flex gap-2">
                        <Button variant="outline">Export</Button>
                        <Button>Create Order</Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 flex-1">
                <Card className="xl:col-span-2 p-4">
                    <OrdersDataTable<OrderSummary, unknown>
                        columns={orderColumns}
                        data={orders}
                        statusOptions={statusOptions}
                        paymentOptions={paymentOptions}
                    />
                </Card>

                <div className="flex flex-col gap-4">
                    {summaryCards.map(({ title, value, helper, icon: Icon }) => (
                        <Card key={title} className="flex-1 min-h-[120px]">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                            {title}
                                        </span>
                                        <span className="text-2xl font-semibold">{value}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{helper}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}



