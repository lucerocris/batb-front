import type { Product } from './product';

export interface CartItem {
  id: string;
  user_id?: string | null;
  session_id?: string | null;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
  size?: string | null;
  subtotal: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartResponse {
  cartItems: CartItem[];
  total: number;
}

export interface CartMutationResponse {
  success: boolean;
  message: string;
  cart_count?: number;
  cart_total?: number;
  item?: CartItem;
}
