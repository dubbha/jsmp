import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

import { User } from './../../models/user';

@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: User;
  oldUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restangular: Restangular,
  ) { }

  ngOnInit() {
    this.user = new User('', '', '', 2000);

    this.route.data.forEach((data: { user: User }) => {
      this.user = Object.assign({}, data.user);
      this.oldUser = data.user;
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.oldUser ||
          ( this.oldUser.firstName === this.user.firstName &&
            this.oldUser.lastName === this.user.lastName &&
            this.oldUser.birthYear === this.user.birthYear )) {
      return true;
    }
    
    return window.confirm('Discard changes?');
  }

  update() {
    const user = this.restangular.all(`user/${this.user.username}`);

    user.post({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthYear: this.user.birthYear
    })
    .toPromise()
    .then((res) => {
      console.log(`update successful:`);
      console.log(res);
      this.oldUser = this.user;
    })
    .catch((err) => console.error(err));
  }

}
