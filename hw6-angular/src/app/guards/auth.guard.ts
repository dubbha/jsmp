import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras
} from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate guard is called');
    return this.checkAuth();
  }

  canLoad(route: Route): boolean {
    console.log('canLoad guard is activated');
    return this.checkAuth();
  }

  checkAuth() {
    const auth = this.authService.auth();
    if (!auth) this.router.navigate(['/login']);
    return this.authService.auth();
  }

}
