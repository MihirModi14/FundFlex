import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  disableBalanceOnEdit: boolean;
  client: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) { 
  }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe((client: Client) => {
      if(client!==null) {
        if(client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  onDelete() {
    this.clientService.deleteClient(this.client);
    this.router.navigate(['/']);
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.router.navigate([`/client/${this.id}`]);
    this.showBalanceUpdateInput = false;
  }

}
