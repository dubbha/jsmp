import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent, LoginComponent, RegisterComponent } from './components';

import { AuthGuard } from './guards/auth.guard';

import { CustomPreloadingStrategyService } from './services';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Angie Chat' },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'cabinet',
    canLoad: [AuthGuard],
    loadChildren: 'app/cabinet/cabinet.module#CabinetModule',
    data: {
      title: 'Cabinet',
      preload: true,
    },
  },
  {
      path: '',
      pathMatch: 'full',
      redirectTo: '/chat',
  },
  {
      path: '**',
      redirectTo: '/chat',
  },
];

export const appRouterComponents = [
    ChatComponent,
    LoginComponent,
    RegisterComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategyService })
  ],
  providers: [
    CustomPreloadingStrategyService,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
