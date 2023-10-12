import { Store } from "@ngrx/store";
import { of, from } from 'rxjs'
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators'
import { AppState } from "../app.state";
import { addItem, loadCart, loadCartFailure, loadCartSuccess, removeItem } from "./cart.actions";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "src/app/services/cart/cart.service";
import { selectCart } from "./cart.selectors";

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cartService: CartService
  ) {}

  // Run this code when a loadCart action is dispatched
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      switchMap(() =>
        from(this.cartService.getCart()).pipe(
          map((cart) => loadCartSuccess({cart: cart})),
          catchError((error) => of(loadCartFailure({error})))
        )
      )
    )
  );

  // Run this code when the addItem or removeItem action is dispatched
  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItem, removeItem),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => from(this.cartService.saveCart(cart)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
