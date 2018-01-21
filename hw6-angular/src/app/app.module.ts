import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

export function RestangularConfigFactory (RestangularProvider, AuthService) {
  RestangularProvider.setBaseUrl('http://127.0.0.1:3000/api');
  RestangularProvider.setDefaultHeaders({'Authorization': `JWT ${AuthService.token}`});
}

@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RestangularModule.forRoot([AuthService], RestangularConfigFactory),
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
