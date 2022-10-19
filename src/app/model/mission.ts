
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
  /**
   identifaint en persistence de la mission
  */
  id: number | null;
  /**
  bonus de la mission
   */
  bonus: number;
  /** Status de la mission */
  status: Status,
  /** moyen de transport majoritaire */
  transport: Transport;
  /**
  date début de la mission
  */
  start: Date;
  /**
  date de fin de la mission
   */
  end: Date;
  /** ville de départ */
  startCity: City;
  /**  ville d'arrivée */
  arrivalCity: City;
  /** nature de la mission */
  nature: Nature;
  /** collaborateur de la mission */
  collaborator: Collaborator | null;
  /** frais de mission */
  expenses: Expense[];


}
