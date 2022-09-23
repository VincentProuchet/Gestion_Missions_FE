import { DatePipe } from "@angular/common";
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

  dateFormatted(date: Date | null) {
    if (date != null) {
      return this.datePipe.transform(date, this.dateFormat);
    }
    return '';
  }
}
