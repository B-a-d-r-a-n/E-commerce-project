import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/products';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  allCategories: Category[] = [];
  constructor(private _CategoriesService: CategoriesService) {}
  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (result) => {
        console.log(result.data);

        this.allCategories = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnInit(): void {
    this.getCategories();
  }
}
