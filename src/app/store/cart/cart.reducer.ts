import { createReducer, on } from '@ngrx/store';
import { reset, addItem, removeItem } from './cart.actions';
import { Cart } from 'src/app/interfaces/store/cart';

export const initialState: Cart = {
  items: [],
  numberOfItems: 0,
  totalPrice: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, action) => ({
    numberOfItems: state.numberOfItems + 1,
    items: [...state.items, action.item],
    totalPrice: state.totalPrice + action.item.price
  })),
  on(removeItem, (state, action) => ({
    numberOfItems: state.numberOfItems - 1,
    items: state.items.filter(item => item.id != action.item.id),
    totalPrice: state.totalPrice - action.item.price
  })),
  on(reset, (state) => state = initialState)
);
