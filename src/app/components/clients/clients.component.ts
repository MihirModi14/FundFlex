import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  totalOwed = 0;

  constructor(private clientService: ClientService) {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.getTotalOwed();
    });
   }

   getTotalOwed() {
    this.totalOwed = this.clients.reduce((total: number, client: Client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
   }

  ngOnInit(): void {
  }

}
