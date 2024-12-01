import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function nonZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === 0 || value === null || value === undefined) {
      return { nonZero: true }
    }

    return null
  };
}
