import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Notifications } from '../../providers/providers';
import { Settings } from '../../providers/providers';

declare var window: any;
@Component({
  selector: 'flowers',
  templateUrl: 'flowers.html'
})
export class FlowersPage {

  flowers: any = [];
  reminder: string;
  sound: string;
  buttonColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public notifications: Notifications,
    public settings: Settings,
  ) {
    this.reminder = 'Time to water';
    this.flowers = [
      { name: 'Begonia', id: 11, time: null },
      { name: 'Hibiscus', id: 12, time: null },
      { name: 'Petunia', id: 13, time: null },
      { name: 'Gladiolus', id: 14, time: null },
    ];
    this.buttonColor = 'default';
  }

  ionViewWillEnter() {
    this.settings.load()
      .then(() => this.sound = this.settings.allSettings.notificationsSound);
  }

  timeChange(event, name, id) {
    console.log('this.sound', this.sound);
    this.notifications.add(event.hour, event.minute, this.reminder, name, id, this.sound);
  }

  photosynthesis() {
    if(this.platform.is('cordova')) {
      window.plugins.flashlight.available(
        (isAvailable) => {
          if (isAvailable) {
            window.plugins.flashlight.toggle();
            this.toggleButtonColor();
          } else {
            alert("flashlight not available");
          }
        }
      );
    } else {
      console.log('would shed some light if I were on cordova platform');
    }
  }

  toggleButtonColor() {
    this.buttonColor === 'default'
      ? this.buttonColor = 'lawn'
      : this.buttonColor = 'default';
  }
}
