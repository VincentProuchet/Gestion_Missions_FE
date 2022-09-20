import { Injectable } from '@angular/core';
import { Transport } from '../model/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor() {
  }

  getTransportValues(): Transport[] {
    return Object.values(Transport);
  }

  getTransportKeys(): (keyof typeof Transport)[] {
    return Object.keys(Transport) as (keyof typeof Transport)[];
  }

  getTransportMap(): Record<keyof typeof Transport, Transport> {
    let keys = this.getTransportKeys();
    let values = this.getTransportValues();
    return values.reduce(
      (result: any, field: any, index: any) => {
        result[keys[index]] = field;
        return result;
      }, {} as any);
  }

  getTransportValue(key: string): Transport {
    return Transport[key as keyof typeof Transport];
  }
}
