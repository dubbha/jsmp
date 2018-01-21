import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class Notifications {
  notifications: any = [];

  constructor(
    public localNotifications: LocalNotifications,
    public platform: Platform,
  ) {
    this.localNotifications.cancelAll();
  }

  add(hour, minute, reminder, name, id, sound) {
    console.log(hour, minute, reminder, name, id);
    console.log('sound');
    console.log(sound);

    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    const notificationTime = now;

    if (nowHour > hour || (nowHour === hour && nowMinute >= minute)) {
      notificationTime.setDate(notificationTime.getDate() + 1);  // add one day
    }
    notificationTime.setHours(hour);
    notificationTime.setMinutes(minute);
    notificationTime.setSeconds(0);
    notificationTime.setMilliseconds(0);

    const notification = {
      id,
      title: 'Notification',
      text: `${reminder} [${name}]`,
      at: notificationTime,
      every: 'day',
      sound: `file://assets/mp3/${sound}.mp3`,
    };
    this.notifications.push(notification);

    if(this.platform.is('cordova')) {
      this.localNotifications.schedule(this.notifications);
      this.notifications = [];
      this.localNotifications.getAllIds()
        .then(ids => ids.forEach(id => {
          console.log(id);
          this.localNotifications.get(id)
            .then(n => {
              console.log(n.at);
              console.log(n.text);
              console.log(n.sound);
            });
        }));
    } else {
      console.log('would set the following notification if I were on cordova platform:', notification);
    }
  }
}
