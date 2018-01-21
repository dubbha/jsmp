import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  username = '';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.username = this.authService.username;
  }

}
