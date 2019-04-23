import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  user: any;

  constructor(private sdata: DataserviceService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.user = JSON.parse(localStorage.getItem('login'));
    try {
      if (this.user.token == null) {
      } else {
        return true;
      }
    }
    catch{
      this.router.navigate([{ outlets: { user: 'login' } }])
      return false;
    }
  }
}
