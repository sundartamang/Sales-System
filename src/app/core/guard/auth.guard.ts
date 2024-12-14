import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/model';
import { AuthService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authService.getCurrentLoginUserRole() as Roles;
    const roles = route.data['roles'] as Roles[];

    if (!currentUser) {
      return this.router.createUrlTree(['/login']);
    }

    if (roles && roles.length > 0 && !roles.includes(currentUser)) {
      alert("You do not have permission to access this page");
      return false;
    }

    return true;
  }
}
