import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/store/cart';
import { CartItem } from 'src/app/interfaces/store/cart-item';

export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ item: CartItem }>());
export const reset = createAction('[Cart] Reset Cart');
export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ cart: Cart }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: string }>());
