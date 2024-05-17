import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return from(user.getIdTokenResult()).pipe(
            map(idTokenResult => {
              if (idTokenResult.claims['admin']) {
                return true;
              } else {
                this.router.navigate(['/access-denied']);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/login']);
          return from([false]); // Koristimo 'from' za pretvorbu boolean u Observable
        }
      })
    );
  }
}
