import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabinetComponent, InfoComponent, FriendsComponent, HomeComponent } from '.';

import { CabinetRoutingModule } from './cabinet.routing.module';

import { CanDeactivateGuard } from '../guards/can.deactivate.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CabinetRoutingModule,
  ],
  declarations: [
    InfoComponent,
    FriendsComponent,
    CabinetComponent,
    HomeComponent
  ],
  providers: [CanDeactivateGuard],
})
export class CabinetModule { }
