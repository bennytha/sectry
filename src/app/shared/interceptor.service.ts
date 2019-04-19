import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let login = JSON.parse(localStorage.getItem('login'));    
    if (login == null) {

      let request = req.clone({
        headers: new HttpHeaders().append('x-auth', '')
      });

      return next.handle(request);

    }
    else {
      let request = req.clone({
        headers: new HttpHeaders().append('x-auth', login.token)
      });

      return next.handle(request);
    }
  }

  constructor() { }
}
