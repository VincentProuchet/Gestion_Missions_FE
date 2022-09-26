import { DatePipe, formatDate } from "@angular/common";
import { AP_Vars } from "src/environments/API_Vars";
/**
 * Classe utilitaire
contient les outils pour les dates
 */
export class DateTools {
  private datePipe: DatePipe = new DatePipe(AP_Vars.dateLocale);
  private dateFormat: string = AP_Vars.dateFormat;

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
      return formatDate(date, "yyyy-MM-dd", AP_Vars.dateLocale);
    }
    return '';
  }
}
