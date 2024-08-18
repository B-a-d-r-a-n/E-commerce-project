import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  allProducts: Product[] = [];
  constructor(private _ProductsService: ProductsService) {}
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
