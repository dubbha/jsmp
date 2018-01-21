import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FlowersPage } from '../pages/flowers/flowers';
import { PetsPage } from '../pages/pets/pets';
import { SettingsPage } from '../pages/settings/settings';

import { Settings } from '../providers/providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tabs', component: TabsPage },
    { title: 'Flowers', component: FlowersPage },
    { title: 'Pets', component: PetsPage },
    { title: 'Settings', component: SettingsPage },
  ]

  constructor(
    private platform: Platform,
    settings: Settings,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {}

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
