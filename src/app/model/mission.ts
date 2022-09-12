
import { City } from "./city";
import { Collaborator } from "./collaborator";
import { Expense } from "./expense";
import { Nature } from "./nature";
import { Status } from "./status";
import { Transport } from "./transport";

/**
 * Mission
 */
export interface Mission {
  /** */
  id: number;
  /** */
  bonus: number;
  /** */
  status: Status,
  /** */
  transport: Transport;
  /**date début de la mission
   * ici le type any est pour le devellopement seuelement
  */
  start: Date;
  /** date de fin de la mission
   * ici le type any est pour le devellopement seuelement
   */
  end: Date;
  /** */
  startCity: City;
  /** */
  arrivalCity: City;
  /** */
  nature: Nature;
  /** */
  collaborator: Collaborator;
  /** */
  expenses: Expense[];

}
