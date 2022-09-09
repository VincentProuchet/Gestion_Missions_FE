import { Nature } from "../nature-mission/Natures";
import { CityService } from "../service/city.service";
import { City } from "./city";
import { Collaborator } from "./collaborator";
import { Expense } from "./expense";
import { Status } from "./status";
import { Transport } from "./transport";

/**
 * Mission
 */
export interface Mission {
  id: number;
  bonus: number;
  status: Status,
  transport: Transport;
  start: Date;
  end: Date;
  startCity: City;
  arrivalCity: City;
  nature: Nature;
  collaborator: Collaborator;
  expenses: Expense[];

}
