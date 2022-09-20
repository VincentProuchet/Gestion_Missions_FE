import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  static dateBetweenValidator(start: Date, end: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const isBeforeStart = !(control.value > start);
      const isAfterEnd =  !(control.value < end);

      return  !(isBeforeStart || isAfterEnd) ? null : {dateBetweenValidator : {"isBeforeStart" : isBeforeStart, 'isAfterEnd' : isAfterEnd}};
    }

  }

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
