import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout/main-layout.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DetailsComponent } from './components/details/details.component';
import { AddressComponent } from './components/address/address.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent, title: 'Signin' },
      { path: 'signup', component: SignupComponent, title: 'Signup' },
      { path: 'forgot', component: ForgotComponent, title: 'Forgot' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'orders', component: OrdersComponent, title: 'Orders' },
      { path: 'details/:id', component: DetailsComponent, title: 'Details' },
      { path: 'address/:id', component: AddressComponent, title: 'Shipping' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];
