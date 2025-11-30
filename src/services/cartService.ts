
import type { CartResponse, CartMutationResponse } from '@/types/cart';

interface AddToCartPayload {
  productId: string;
  quantity?: number;
  size?: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
  });

  let data: T | null = null;

  try {
    data = await response.json();
  } catch (error) {
    console.error('Failed to parse cart response', error);
  }

  if (!response.ok || !data) {
    throw new Error(
      data && typeof data === 'object' && 'message' in data
        ? (data as { message?: string }).message || 'Cart request failed'
        : 'Cart request failed'
    );
  }

  return data;
}

export async function addToCart({
  productId,
  quantity = 1,
  size = null,
}: AddToCartPayload): Promise<CartMutationResponse> {
  return request<CartMutationResponse>('/cart', {
    method: 'POST',
      credentials: 'include',
    body: JSON.stringify({
      product_id: productId,
      quantity,
      size,
    }),
  });
}

export async function fetchCart(): Promise<CartResponse> {
  return request<CartResponse>('/cart', {
    method: 'GET',
  });
}

export async function updateCartItem(
  id: string,
  quantity: number
): Promise<CartMutationResponse> {
  return request<CartMutationResponse>(`/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(
  id: string
): Promise<CartMutationResponse> {
  return request<CartMutationResponse>(`/cart/${id}`, {
    method: 'DELETE',
  });
}

export async function clearCart(): Promise<CartMutationResponse> {
  return request<CartMutationResponse>('/cart', {
    method: 'DELETE',
  });
}
