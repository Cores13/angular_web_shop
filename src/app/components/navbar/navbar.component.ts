import { Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/interfaces/store/cart';
import { selectCart } from 'src/app/store/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() languageChangeEvent: EventEmitter<any> = new EventEmitter();
  cart$: Observable<Cart> = this.store.select(selectCart);

  constructor(private store: Store<Cart>){}

  ngOnInit ():void {
    console.log(this.cart$);
  }

  setLanguage(language: any): void {
    this.languageChangeEvent.emit(language.value);
  }
}
