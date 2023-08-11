import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  notification: string = '';
  userAdded: boolean = false;

  disableBalanceOnAdd: boolean;

  constructor(
      private router: Router,
      private clientService: ClientService,
      private settingService: SettingsService
    ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this.notification = "Please fill out the form correctly";
      this.userAdded = false;

      setTimeout(() => {
        this.notification = '';
      }, 2000);

    } else {
      this.notification = "New client added";
      this.userAdded = true;

      this.clientService.newClient(this.client);
      setTimeout(() => {
        this.notification = '';
        this.userAdded = false;

        this.router.navigate(['/'])
      }, 1000);

    }
  }

}
