// src/services/cartService.ts
import type { CartResponse, CartMutationResponse } from '@/types/cart';

interface AddToCartPayload {
    productId: string;
    quantity?: number;
    size?: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Read cookie by name (returns decoded value or null)
 */
function getCookie(name: string): string | null {
    const match = document.cookie.split('; ').find((row) => row.trim().startsWith(name + '='));
    if (!match) return null;
    return decodeURIComponent(match.split('=').slice(1).join('='));
}

/**
 * Ensure the CSRF cookie is present. Idempotent - will only call endpoint once per page load.
 * Useful for SPA: call on bootstrap or before first mutating request.
 */
let _csrfEnsured = false;
export async function ensureCsrfCookie(): Promise<void> {
    if (_csrfEnsured) return;
    if (!API_BASE_URL) throw new Error('Missing VITE_API_BASE_URL');

    // Laravel Sanctum endpoint that sets XSRF-TOKEN cookie
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });

    _csrfEnsured = true;
}

/**
 * Generic fetch wrapper that:
 * - always sends credentials
 * - attaches X-XSRF-TOKEN header for non-GET/HEAD/OPTIONS requests
 * - handles JSON parsing + error message extraction
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (!API_BASE_URL) throw new Error('Missing VITE_API_BASE_URL');

    const method = (options.method ?? 'GET').toUpperCase();

    const baseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers as Record<string, string> | undefined),
    };

    // Add X-XSRF-TOKEN for mutating requests
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const xsrf = getCookie('XSRF-TOKEN');
        if (xsrf) baseHeaders['X-XSRF-TOKEN'] = xsrf;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include',
        ...options,
        headers: baseHeaders,
    });

    let data: T | null = null;
    try {
        data = await response.json();
    } catch (err) {
        // If response is not JSON, leave data null
        console.error('Failed to parse response JSON', err);
    }

    if (!response.ok || !data) {
        // Try to extract a message from JSON if present
        const message =
            data && typeof data === 'object' && 'message' in data
                ? (data as any).message || 'Request failed'
                : `Request failed: ${response.status} ${response.statusText}`;
        throw new Error(message);
    }

    return data;
}

/**
 * API functions
 */
export async function addToCart({
                                    productId,
                                    quantity = 1,
                                    size = null,
                                }: AddToCartPayload): Promise<CartMutationResponse> {
    // Ensure CSRF cookie is present so XSRF-TOKEN cookie exists for header attachment
    await ensureCsrfCookie();

    return request<CartMutationResponse>('/cart', {
        method: 'POST',
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

export async function removeCartItem(id: string): Promise<CartMutationResponse> {
    // ensure CSRF cookie before mutating
    await ensureCsrfCookie();
    return request<CartMutationResponse>(`/cart/${id}`, {
        method: 'DELETE',
    });
}

export async function clearCart(): Promise<CartMutationResponse> {
    // ensure CSRF cookie before mutating
    await ensureCsrfCookie();
    return request<CartMutationResponse>('/cart', {
        method: 'DELETE',
    });
}

/**
 * Optional convenience: call this once on app bootstrap to fetch CSRF cookie early.
 * Example usage:
 *   import { initCartService } from '@/services/cartService';
 *   initCartService();
 */
export async function initCartService(): Promise<void> {
    try {
        await ensureCsrfCookie();
    } catch (err) {
        // ignore; we'll attempt again before mutating requests
        console.warn('Failed to ensure CSRF cookie on init', err);
    }
}
