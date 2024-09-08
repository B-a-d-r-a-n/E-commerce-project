import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/products';

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
  product!: Product;

  ngOnInit(): void {
    let id = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        id = param.get('id')!;
      },
    });

    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res.data;
      },
    });
  }
}
