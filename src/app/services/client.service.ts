import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  [x: string]: any;
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
    map((changes: any) => {
        return changes.map((action: any) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.clients;
  }

  newClient(client: Client): void {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action: any) => {
        if(action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          
          return data;
        }
      })
    );

    return this.client;
  }

  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
      this.clientDoc = this.afs.doc(`clients/${client.id}`);
      this.clientDoc.delete();
  }
}
