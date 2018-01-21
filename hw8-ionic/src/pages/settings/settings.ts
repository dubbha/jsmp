import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  options: any; // local settings object
  settingsReady = false;
  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams
  ) { }

  _buildForm() {
    let group: any = {
      notificationsEnabled: [this.options.notificationsEnabled],
      notificationsSound: [this.options.notificationsSound],
      option3: [this.options.option3]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      console.log('this.options', this.options);

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
