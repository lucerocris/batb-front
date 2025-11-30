import type { StoreOrderPayload, StoreOrderResponse } from '@/types/order';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_HOST_URL = API_BASE_URL?.replace(/\/api\/?$/, '');

const ORDERS_PATH = '/orders';
const CSRF_PATH = '/sanctum/csrf-cookie';

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

const getCookieValue = (name: string) => {
  const value = document.cookie
    ?.split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
};

let csrfInitialized = false;
let csrfPromise: Promise<void> | null = null;

const ensureCsrfCookie = async () => {
  if (csrfInitialized) {
    return;
  }

  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL');
  }

  if (!csrfPromise) {
    const csrfBase = API_HOST_URL ?? API_BASE_URL;
    if (!csrfBase) {
      throw new Error('Missing API host for CSRF initialization.');
    }

    csrfPromise = fetch(`${csrfBase}${CSRF_PATH}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to initialize CSRF protection.');
        }
        csrfInitialized = true;
      })
      .catch((error) => {
        csrfInitialized = false;
        throw error;
      })
      .finally(() => {
        csrfPromise = null;
      });
  }

  return csrfPromise;
};

export async function submitOrder(
  payload: StoreOrderPayload
): Promise<StoreOrderResponse> {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL');
  }

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
  };

  const xsrfToken = getCookieValue('XSRF-TOKEN');
  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = xsrfToken;
  }

  const response = await fetch(`${API_BASE_URL}${ORDERS_PATH}`, {
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
