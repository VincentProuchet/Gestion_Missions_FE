import { Injectable } from '@angular/core';
import { Transport } from '../model/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  transports = Object.values(Transport);

  constructor() {
    this.transports.splice(this.transports.length / 2)
  }

  getTransportList() {
    return this.transports;
  }
}
