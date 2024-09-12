import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Wishlist } from '../../core/interfaces/wishlist';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlist!: Wishlist;
  isLoading: boolean = true;
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  getLoggedUserCart = () => {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);

        this.wishlist = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  };
  deleteItem = (productId: string) => {
    this._WishlistService.removeItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlist = res;
        this._toastr.success(`Product removed successfully`, '', {
          tapToDismiss: true,
        });
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
  ngOnInit(): void {
    this.getLoggedUserCart();
  }
}
