import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { AuthService } from '../../core/services/auth.service';
import { SliderComponent } from '../slider/slider.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import {
  CurrencyPipe,
  DatePipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    CategorySliderComponent,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    SlicePipe,
    SoldOutPipe,
    SearchPipe,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  term: string = '';
  allProducts: Product[] = [];
  cancelSubscription: Subscription = new Subscription();
  constructor(
    private _ProductsService: ProductsService,
    private token: AuthService // private spinner: NgxSpinnerService
  ) {
    this.token.saveUserData();
  }
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _toastr = inject(ToastrService);
  getProducts = () => {
    // this.spinner.show('spin1');
    this.cancelSubscription = this._ProductsService.getProducts().subscribe({
      next: (result) => {
        console.log(result.data);

        this.allProducts = result.data;
        // this.spinner.hide('spin1');
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
        this._toastr.success(`Product added successfully`, '', {
          tapToDismiss: true,
          timeOut: 2000,
        });
      },
    });
  };
  addToWishlist = (productId: string) => {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        this._toastr.success(`Product added successfully`, '', {
          tapToDismiss: true,
          timeOut: 2000,
        });
      },
    });
  };

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
