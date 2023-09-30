import { createSelector } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/store/cart';
import { AppState } from '../app.state';

export const getCart = (state: AppState) => state.cart;

export const selectCart = createSelector(
  getCart,
  (state: Cart) => state
);

export const selectCartItems = createSelector(
  getCart,
  (state: Cart) => state.items
);

export const selectNumberOfItems = createSelector(
  getCart,
  (state: Cart) => state.numberOfItems
);

export const selectTotalPrice = createSelector(
  getCart,
  (state: Cart) => state.totalPrice
);
