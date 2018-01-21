import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Restangular } from 'ngx-restangular';

import { User } from './../models/user';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private router: Router,
    private restangular: Restangular,
  ) {}
  
  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    const username = route.params['username'];

    console.log('Resolving user, got username from route params: ', username);

    const user = this.restangular.oneUrl(`user/${username}`);

    return user.get()
    .toPromise()
    .then((res) => {
      console.log(`resolved:`);
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });

    /*
    return Promise.resolve({
        username,
        firstName: 'resolvedFirstName',
        lastName: 'resolvedLastName',
        birthYear: 2000,
    });
    */
  }
}
