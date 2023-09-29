import { CartItem } from "./cart-item";

export interface Cart {
  items: CartItem[];
  numberOfItems: number;
  totalPrice: number;
}
