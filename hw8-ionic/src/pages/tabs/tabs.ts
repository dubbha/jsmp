import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
// import { Tab4Root } from '../pages';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = "Flowers";
  tab2Title = "Pets";
  tab3Title = "Settings";

  constructor(public navCtrl: NavController) {
  }
}
