import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  private readonly _Router = inject(Router);
  signup = (user: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };
  signin = (user: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };
  forgotPasswords = (email: any): Observable<any> => {
    return this._HttpClient.post(
      baseUrl + 'api/v1/auth/forgotPasswords',
      email
    );
  };
  verifyResetCode = (code: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  };
  resetPassword = (newPassword: any): Observable<any> => {
    return this._HttpClient.put(
      baseUrl + 'api/v1/auth/resetPassword',
      newPassword
    );
  };

  saveUserData = () => {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        let decoded = jwtDecode(token);
        console.log(decoded);
      } catch (error) {
        this._Router.navigate(['/signin']);
        localStorage.clear;
      }
    }
  };
}
