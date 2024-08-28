import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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

  ngOnInit(): void {
    this.getProducts();
  }
}
