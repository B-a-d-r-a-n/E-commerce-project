import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);

  product!: Product;

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
    let id = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        id = param.get('id')!;
      },
    });
    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        console.log(res);

        this.product = res.data;
      },
    });
  }
}
