import { DatePipe, formatDate } from "@angular/common";
import { AP_Vars } from "src/environments/API_Vars";
import { Expense } from "./expense";
import { Status } from "./status";
import { Transport } from "./transport";
/**
 * Classe utilitaire
  contenant des fonctions utilitaires
  le but est de ne plus trouver
  la même fonction répliquée un peu partout
 */
export class ToolBox {
  private datePipe: DatePipe = new DatePipe(AP_Vars.dateLocale);
  private dateFormat: string = AP_Vars.dateFormat;
  private formatForDateInputs: string = "yyyy-MM-dd";
  /** enumeration des status */
  private statusEnum: typeof Status = Status;

  /**
   * formate la date passée en paramète
  en fonction des paramètres dans AP_Vars
   * @param date
   * @returns a formated date fonction locale in AP_Vars
   */

  format(date: Date | null): String | null {
    if (date != null) {
      return this.datePipe.transform(date, this.dateFormat);
    }
    return '';
  }
  /**
   * wil give you back the date you gave
   * in a format that can
   * autoamtically
   * fill in date Form inputs
   * @param date
   * @returns
   */
  inputFormat(date: Date | null): String {
    if (date != null) {
      return formatDate(date, this.formatForDateInputs, AP_Vars.dateLocale);
    }
    return '';
  }
  /**
      return class for interface button
      depending on the status given in parameter
    *
    * @param status a mission status
    * @returns String representing a boostrap class
    */
  getStatusColor(status: Status): string {
    let bsClass = "";
    switch (status.toString()) {

      case Status[1]:
        bsClass = "text-success";
        break;
      case Status[2]:
        bsClass = "text-danger";
        break;
      case Status[3]:
        bsClass = "text-primary";
        break;
      default:
        break;
    }
    return bsClass;
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
   * retourne l'identifiant d'un transport depuis sa valeur texte
   * @date 21/09/2022 - 12:33:08
   *
   * @param {string} key
   * @returns {Transport}
   */
  getTransportValue(key: string): Transport {
    return Transport[key as keyof typeof Transport];
  }
  /**
   * give you a transport instance
  * of transport enum
  from its key
   * @param key
   * @returns
   */
  getTransport(key: String): Transport {


    return Transport.Car;
  }
  /**
  * compare two items by their id
 may be refactored to a static tools box class
  used in form to fill in the corrcet value of select input
  when initializing a form with existing datas
  * @param itemOne
  * @param itemTwo
  * @returns itemOne instance coresponding to the itemTwo.id
  */
  compareById(itemOne: any, itemTwo: any) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

  /**
   * will sum all expense from a list
   * @param expenses[] list of expense to sum
   * @returns the sum off all expenses in the list
   */
  sumExpenses(expenses: Expense[]): number {
    //  create a new list containing only expense.cost   /// then summing all cost.
    return expenses.map(expense => expense.cost).reduce((currSum, currElement) => currSum + currElement, 0);
  }

}
