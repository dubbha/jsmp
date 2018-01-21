import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import './rxjs-extensions';

@Injectable()
export class AuthService {
  token = null;
  username = null;

  auth(): boolean {
    return (!!this.token);
  }

  saveSession(token, username): void {
    this.token = token;
    this.username = username;
    console.log('login: ', this.token, this.username);
  }

  logout(): void {
    this.token = null;
    this.username = null;
    console.log('logout: ', this.token, this.username);
  }
}