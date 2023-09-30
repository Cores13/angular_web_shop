import { createReducer, on } from '@ngrx/store';
import { reset, addItem, removeItem, loadCart, loadCartSuccess, loadCartFailure } from './cart.actions';
import { Cart } from 'src/app/interfaces/store/cart';
import { Status } from 'src/app/enums/status';

export const initialState: Cart = {
  items: [{
    id: 0,
    name: '',
    description: '',
    price: 0,
    inStock: 0,
    image: ''
  }],
  numberOfItems: 0,
  totalPrice: 0,
  error: null,
  status: Status.pending
};

export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, {item}) => ({
    ...state,
    numberOfItems: state.numberOfItems + 1,
    items: [...state.items, item],
    totalPrice: state.totalPrice + item.price
  })),
  on(removeItem, (state, {item}) => ({
    ...state,
    numberOfItems: state.numberOfItems - 1,
    items: state.items.filter(item => item.id != item.id),
    totalPrice: state.totalPrice - item.price
  })),
  on(loadCart, (state) => ({
    ...state,
    status: Status.loading
  })),
  on(loadCartSuccess, (state, {cart}) => ({
    ...state,
    status: Status.success
  })),
  on(loadCartFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: Status.error
  })),
  on(reset, (state) => state = initialState)
);
