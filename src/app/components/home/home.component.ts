import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { AuthService } from '../../core/services/auth.service';
import { SliderComponent } from '../slider/slider.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private token: AuthService
  ) {
    this.token.saveUserData();
  }
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (result) => {
        console.log(result.data);

        this.allProducts = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  addToCart = (productId: string) => {
    this._CartService.addProductToCart(productId).subscribe({
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
}
