import { Component, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/products';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];
  constructor(private _BrandsService: BrandsService) {}
  getBrands = () => {
    this._BrandsService.getBrands().subscribe({
      next: (result) => {
        console.log(result.data);

        this.allBrands = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnInit(): void {
    this.getBrands();
  }
}
