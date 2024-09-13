import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}
  wishlistCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  getLoggedUserWishlist = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/wishlist/');
  };
  addProductToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/wishlist', { productId });
  };
  removeItem = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/wishlist/' + productId);
  };
}
