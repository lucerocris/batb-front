import type { OrderSummary, OrderStatus, PaymentStatus } from "@/features/admin/orders/types/orders.types.ts";

const orderStatusSequence: OrderStatus[] = ["pending", "processing", "completed", "cancelled"];
const paymentStatusSequence: PaymentStatus[] = ["paid", "partially_paid", "refunded", "unpaid"];

export const sampleOrders: OrderSummary[] = Array.from({ length: 12 }).map((_, index) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - index);

    const orderStatus = orderStatusSequence[index % orderStatusSequence.length];
    const paymentStatus = paymentStatusSequence[index % paymentStatusSequence.length];

    return {
        id: `order-${index + 1}`,
        orderId: `BATB-${(10234 + index).toString().padStart(5, "0")}`,
        customerName: ["Ava Dela Cruz", "Liam Santos", "Noah Reyes", "Mia Vergara", "Ethan Garcia"][ index % 5 ],
        items: (index % 4) + 1,
        totalAmount: 1500 + index * 250,
        orderStatus,
        paymentStatus,
        orderDate: baseDate.toISOString(),
    };
});

