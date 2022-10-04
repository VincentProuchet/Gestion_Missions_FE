import { DatePipe, formatDate } from "@angular/common";
import { AP_Vars } from "src/environments/API_Vars";
import { Status } from "./status";
/**
 * Classe utilitaire
contient les outils pour les dates
 */
export class DateTools {
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

}
