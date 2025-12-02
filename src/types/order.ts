export type OrderPaymentMethod = 'gcash' | 'bank_transfer';

export interface StoreOrderPayload {
  userId: string | null;
  paymentMethod: OrderPaymentMethod;
  paymentReference: string;
  paymentSentDate: string;
  image: File | null;
  email: string;
  currency: string;
  customerNotes: string;
  shippingAddress: {
    first_name: string;
    last_name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    barangay: string;
    region: string;
    postalCode: string;
    countryCode: string;
    phone: string;
  };
  orderItems: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  idempotencyKey?: string;
  discountAmount?: number;
  taxAmount?: number;
  shippingAmount?: number | null;
}

export interface StoreOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
  orderNumber?: string;
}

