import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = 'user';
  password = 'pass';

  constructor(
    private router: Router,
    private restangular: Restangular,
  ) { }

  submit() {
    console.log('submitting');
    console.log('this.username:',this.username);
    console.log('this.password:',this.password);

    const login = this.restangular.all('user');

    login.post({
      username: this.username,
      password: this.password
    })
    .toPromise()
    .then((res) => {
      console.log(`created:`);
      console.log(res);
      this.router.navigate(['/login']);
    })
    .catch((err) => {
      console.error(err);
    });
  }


}
