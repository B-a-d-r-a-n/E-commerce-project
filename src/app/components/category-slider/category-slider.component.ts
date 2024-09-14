import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/products';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css',
})
export class CategorySliderComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  categories: Category[] = [];
  getCategories() {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl: true,

    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    slideTransition: 'linear',
    smartSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
}
