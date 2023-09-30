import { Status } from "src/app/enums/status";
import { CartItem } from "./cart-item";

export interface Cart {
  items: CartItem[];
  numberOfItems: number;
  totalPrice: number;
  error: string | null;
  status: Status;
}
