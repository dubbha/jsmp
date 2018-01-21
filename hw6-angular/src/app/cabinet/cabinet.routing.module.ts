import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { CabinetComponent, HomeComponent, InfoComponent, FriendsComponent } from '.';

import { CanDeactivateGuard } from '../guards/can.deactivate.guard';
import { UserResolveGuard } from '../guards/user.resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'info/:username',
            component: InfoComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              user: UserResolveGuard
            },
          },
          { path: 'friends', component: FriendsComponent },
          { path: '', component: HomeComponent }
        ]
      }
    ]
  }
];

export let cabinetRouterComponents = [CabinetComponent, HomeComponent, InfoComponent, FriendsComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [UserResolveGuard],
})
export class CabinetRoutingModule { }
