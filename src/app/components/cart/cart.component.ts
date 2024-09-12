import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart!: Cart;
  isLoading: boolean = true;
  private readonly _CartService = inject(CartService);
  private readonly _toastr = inject(ToastrService);
  getLoggedUserCart = () => {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  };
  deleteItem = (productId: string) => {
    this._CartService.removeItem(productId).subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(res.numOfCartItems);

        console.log(res);
        this.cart = res;
        this._toastr.success(`Product removed successfully`, '', {
          tapToDismiss: true,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  updateQTY = (productId: string, count: number) => {
    this._CartService.updateProductQTY(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res;
        this._toastr.success(`Product updated successfully`, '', {
          tapToDismiss: true,
          timeOut: 2000,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this._CartService.cartCounter.next(0);
        this._toastr.success(`Cart emptied successfully`, '', {
          tapToDismiss: true,
          timeOut: 2000,
        });

        this.getLoggedUserCart();
      },
    });
  }
  ngOnInit(): void {
    this.getLoggedUserCart();
  }
}
