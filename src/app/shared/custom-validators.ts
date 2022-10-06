import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
/**
 * classe de validator personnalisés pour les formulaires
 */
export class CustomValidators {

  /**
   * valide si la date controlé est entre les date de début et de fin
    le début et la fin est inclus
   * @param start date de début de la période de validité
   * @param end date de fin de la période de validité
   * @returns
   */
  static dateBetweenValidator(start: Date, end: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const isBeforeStart = !(control.value >= start);
      const isAfterEnd = !(control.value <= end);

      return !(isBeforeStart || isAfterEnd) ? null : { dateBetweenValidator: { "isBeforeStart": isBeforeStart, 'isAfterEnd': isAfterEnd } };
    }

  }
  /**
   *
   * @returns
   */
  static startEndDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const start = control.get("startDateControl")!.value;
      const end = control.get("endDateControl")!.value;
      if (start == "" || end == "") {
        return null;
      }
      return start <= end ? null : { startEndDateValidator: true };
    }
  }

}
