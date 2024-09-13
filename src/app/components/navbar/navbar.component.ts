import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslationService } from '../../core/services/my-translation.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  wishlistCounter: number = 0;
  counter: number = 0;
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _MyTranslationService = inject(MyTranslationService);
  readonly _TranslateService = inject(TranslateService);
  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);
      },
    });
  };
  getLoggedUserWishlist = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this._WishlistService.wishlistCounter.next(res.count);
      },
    });
  };
  ngOnInit(): void {
    this.getLoggedUserCart();
    this.getLoggedUserWishlist();
    this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.counter = counter;
      },
    });
    this._WishlistService.wishlistCounter.subscribe({
      next: (counter) => {
        this.wishlistCounter = counter;
      },
    });
    this._MyTranslationService.changeDirection();
  }
  selectLang(lang: string) {
    this._MyTranslationService.changeLang(lang);
  }
  logOut() {
    localStorage.removeItem('token');
  }
}
