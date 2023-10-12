import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Cart } from '../../interfaces/store/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageInitialised = false;

  constructor(private storage: Storage) {}

  async getCart(): Promise<Cart> {
    if (!this.storageInitialised) await this.storage.create();

    return (await this.storage.get('cart')) || [];
  }

  async saveCart(cart: Cart) {
    if (!this.storageInitialised) await this.storage.create();

    return this.storage.set('cart', cart);
  }
}
