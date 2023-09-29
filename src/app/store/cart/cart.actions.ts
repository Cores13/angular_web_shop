import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/interfaces/store/cart-item';

export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ item: CartItem }>());
export const reset = createAction('[Cart] Reset');
