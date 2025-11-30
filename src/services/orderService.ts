import type { StoreOrderPayload, StoreOrderResponse } from '@/types/order';
import {
  ensureCsrfCookie,
  getApiBaseUrl,
  getXsrfHeaders,
} from './apiClient';

const ORDERS_PATH = '/orders';

const appendOptional = (formData: FormData, key: string, value: unknown) => {
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return;
  }

  formData.append(key, String(value));
};

export async function submitOrder(
  payload: StoreOrderPayload
): Promise<StoreOrderResponse> {
  const apiBaseUrl = getApiBaseUrl();

  if (!payload.image) {
    throw new Error('Payment proof image is required.');
  }

  await ensureCsrfCookie();

  const formData = new FormData();
  appendOptional(formData, 'userId', payload.userId ?? '');
  appendOptional(formData, 'paymentMethod', payload.paymentMethod);
  appendOptional(formData, 'paymentReference', payload.paymentReference);
  appendOptional(formData, 'paymentSentDate', payload.paymentSentDate);
  appendOptional(formData, 'email', payload.email);
  appendOptional(formData, 'currency', payload.currency);
  appendOptional(formData, 'customerNotes', payload.customerNotes);
  appendOptional(formData, 'idempotencyKey', payload.idempotencyKey);
  appendOptional(formData, 'discountAmount', payload.discountAmount ?? 0);
  appendOptional(formData, 'taxAmount', payload.taxAmount ?? 0);
  appendOptional(formData, 'shippingAmount', payload.shippingAmount ?? 0);

  const { shippingAddress } = payload;
  Object.entries(shippingAddress).forEach(([key, value]) => {
    appendOptional(formData, `shippingAddress[${key}]`, value);
  });

  payload.orderItems.forEach((item, index) => {
    appendOptional(formData, `orderItems[${index}][productId]`, item.productId);
    appendOptional(formData, `orderItems[${index}][quantity]`, item.quantity);
    appendOptional(formData, `orderItems[${index}][unitPrice]`, item.unitPrice);
  });

  formData.append('image', payload.image);

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...getXsrfHeaders(),
  };

  const response = await fetch(`${apiBaseUrl}${ORDERS_PATH}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });

  const data: StoreOrderResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || 'Failed to submit order. Please try again later.'
    );
  }

  return data;
}
