import { Injectable } from '@angular/core';
import { Transport } from '../model/transport';

/**
 * Description placeholder
 * @date 21/09/2022 - 12:33:08
 *
 * @export
 * @class TransportService
 * @typedef {TransportService}
 */
@Injectable({
  providedIn: 'root'
})
export class TransportService {


  /**
   * Creates an instance of TransportService.
   * @date 21/09/2022 - 12:33:08
   *
   * @constructor
   */
  constructor() {
  }

  /**
   * retourne la liste des transport
   * @date 21/09/2022 - 12:33:08
   *
   * @returns {Transport[]}
   */
  getTransportValues(): Transport[] {
    return Object.values(Transport);
  }

  /**
   * retourne la liste des identifinat des transports
   * @date 21/09/2022 - 12:33:08
   *
   * @returns {(keyof typeof Transport)[]}
   */
  getTransportKeys(): (keyof typeof Transport)[] {
    return Object.keys(Transport) as (keyof typeof Transport)[];
  }

  /**
   * Retourne une liste d'objet associant des identifiant et leurs valeurs
   * @date 21/09/2022 - 12:33:08
   *
   * @returns {Record<keyof typeof Transport, Transport>}
   */
  getTransportMap(): Record<keyof typeof Transport, Transport> {
    let keys = this.getTransportKeys();
    let values = this.getTransportValues();
    return values.reduce(
      (result: any, field: any, index: any) => {
        result[keys[index]] = field;
        return result;
      }, {} as any);
  }

  /**
   * retourne l'identifiant d'un trasport depuis sa valeur texte
   * @date 21/09/2022 - 12:33:08
   *
   * @param {string} key
   * @returns {Transport}
   */
  getTransportValue(key: string): Transport {
    return Transport[key as keyof typeof Transport];
  }
}
