import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Notifications } from '../../providers/providers';
import { Settings } from '../../providers/providers';

@Component({
  selector: 'pets',
  templateUrl: 'pets.html'
})
export class PetsPage {

  pets: any = [];
  reminder: string;
  sound: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public notifications: Notifications,
    public settings: Settings,
  ) {
    this.reminder = 'Time to feed';
    this.pets = [
      { name: 'Cat', id: 21, time: null },
      { name: 'Dog', id: 22, time: null },
      { name: 'Bat', id: 23, time: null },
      { name: 'Frog', id: 24, time: null },
    ];

  }

  ionViewWillEnter() {
    this.settings.load()
      .then(() => this.sound = this.settings.allSettings.notificationsSound);
  }

  timeChange(event, name, id) {
    console.log('this.sound', this.sound);
    this.notifications.add(event.hour, event.minute, this.reminder, name, id, this.sound);
  }

}
