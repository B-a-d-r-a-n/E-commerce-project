import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  //logic send to backend = req
  console.log(req.url);
  if (
    req.url.includes('cart') ||
    req.url.includes('categories') ||
    req.url.includes('orders') ||
    req.url.includes('wishlist')
  ) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!,
      },
    });
  }

  return next(req);
};
