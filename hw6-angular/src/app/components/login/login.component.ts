import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'user';
  password = 'pass';

  constructor(
    private router: Router,
    private restangular: Restangular,
    private authService: AuthService,
  ) {}

  submit() {
    console.log('submitting');
    console.log('this.username:',this.username);
    console.log('this.password:',this.password);

    const login = this.restangular.all('user/login');

    login.post({
      username: this.username,
      password: this.password
    })
    .toPromise()
    .then((res) => {
      console.log(res);
      this.authService.saveSession(res.token, this.username);
      this.router.navigate(['/']);
    })
    .catch((err) => {
      console.error(err);
    });
  }

}
