import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  id: string;
  notification: string = '';
  userEdited: boolean = false;
  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });
  }

  onSubmit({value,valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this.notification = "Please fill out the form correctly";
      this.userEdited = false;

      setTimeout(() => {
        this.notification = '';
      }, 2000);

    } else {
      this.notification = "Client Edited";
      this.userEdited = true;
      
      value.id = this.client.id;
      this.clientService.updateClient(value as Client);
      setTimeout(() => {
        this.notification = '';
        this.userEdited = false;

        this.router.navigate([`/client/${this.id}`]);
      }, 1000);
    }
  }

}
