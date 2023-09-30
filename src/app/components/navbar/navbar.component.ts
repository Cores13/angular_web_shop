import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/interfaces/store/cart';
import { AppState } from 'src/app/store/app.state';
import { selectCart, selectCartItems, selectNumberOfItems } from 'src/app/store/cart/cart.selectors';
import { addItem, loadCart, removeItem } from 'src/app/store/cart/cart.actions';
import { CartItem } from 'src/app/interfaces/store/cart-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() languageChangeEvent: EventEmitter<any> = new EventEmitter();
  numberOfItems: number = 0;

  constructor(private store: Store<AppState>){
     this.store.pipe(select(selectNumberOfItems)).subscribe((numberOfItems) => {this.numberOfItems = numberOfItems;})
  }

  ngOnInit ():void {
    this.store.dispatch(loadCart())
  }

  setLanguage(language: any): void {
    this.languageChangeEvent.emit(language.value);
  }
}
