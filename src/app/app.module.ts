import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// STORE
import { StoreModule, provideStore, provideState } from '@ngrx/store';
import { cartReducer } from './store/cart/cart.reducer';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// FOR AoT
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          // FOR AoT
          // useFactory: (createTranslateLoader),
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ cart: cartReducer })
  ],
  providers: [
    provideStore({cart: cartReducer}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
