import { Injectable } from '@angular/core';
import { Transport } from '../model/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  transports = Object.values(Transport);

  constructor() {
  }

  getTransportList() {
    return this.transports;
  }
}
