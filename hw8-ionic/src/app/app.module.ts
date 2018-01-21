import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications'; // remove??

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { FlowersPage } from '../pages/flowers/flowers';
import { PetsPage } from '../pages/pets/pets';
import { SettingsPage } from '../pages/settings/settings';

import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { Notifications } from '../providers/notifications';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
/*
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
*/

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    notificationsEnabled: true,
    notificationsSound: 'marigold',
  });
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FlowersPage,
    PetsPage,
    SettingsPage,
  ],
  imports: [
    BrowserModule,
    // HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FlowersPage,
    PetsPage,
    SettingsPage,
  ],
  providers: [
    Api,
    Items,
    // User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    LocalNotifications, // remove me?
    Notifications,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
