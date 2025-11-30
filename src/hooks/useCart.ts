import { useCallback, useEffect, useState } from 'react';
import type { CartItem } from '@/types/cart';
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
  clearCart as clearCartRequest,
} from '@/services/cartService';

interface UseCartReturn {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export function useCart(autoFetch = true): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCart();
      setItems(data.cartItems || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      loadCart();
    }
  }, [autoFetch, loadCart]);

  const removeItem = useCallback(
    async (id: string) => {
      await removeCartItem(id);
      await loadCart();
    },
    [loadCart]
  );

  const updateItemQuantity = useCallback(
    async (id: string, quantity: number) => {
      await updateCartItem(id, quantity);
      await loadCart();
    },
    [loadCart]
  );

  const clearCart = useCallback(async () => {
    await clearCartRequest();
    await loadCart();
  }, [loadCart]);

  return {
    items,
    total,
    loading,
    error,
    refetch: loadCart,
    removeItem,
    updateItemQuantity,
    clearCart,
  };
}
