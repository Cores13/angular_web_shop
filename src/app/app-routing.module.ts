import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'cart', component: CartComponent},

  {
    path: '', component: UserLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'cart', component: CartComponent},
    ]
  },

  // Protected routes
  {
    path: 'admin',
    children: [
      {
        path: '', component: AuthLayoutComponent,
        children: [
          {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
          {path: 'login', component: LoginComponent},
          // {path: 'register', component: RegisterComponent},
          {path: 'passwordreset', component: PasswordResetComponent},
        ]
      },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
