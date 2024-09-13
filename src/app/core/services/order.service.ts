import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // e3mel cash order
  constructor(private _HttpClient: HttpClient) {}
  createSession = (
    cartId: string,
    shippingAddress: object
  ): Observable<any> => {
    return this._HttpClient.post(
      baseUrl +
        `api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress }
    );
  };
  createCashOrder = (
    cartId: string,
    shippingAddress: object
  ): Observable<any> => {
    return this._HttpClient.post(baseUrl + `api/v1/orders/${cartId}`, {
      shippingAddress,
    });
  };
}
