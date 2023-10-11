import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartItem } from '../../interfaces/store/cart-item';
import { addItem, removeItem } from '../../store/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  title = 'web-shop';

  constructor(private translate: TranslateService, private store: Store) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
      // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  addItem(item: CartItem):void {
    this.store.dispatch(addItem({ item: item }));
  }

  removeItem(item: CartItem): void {
    this.store.dispatch(removeItem({ item: item }));
  }

  onLanguageChange(item: any): void {
    this.translate.use(item);
  }
}
