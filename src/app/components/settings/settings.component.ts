import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from 'src/app/models/Settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings = {
    allowRegistration: null,
    disableBalanceOnAdd: null,
    disableBalanceOnEdit: null,
  };

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.router.navigate(['/']);
  }
}
