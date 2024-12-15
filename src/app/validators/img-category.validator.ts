import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenUrlValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || typeof value !== 'string') {
      return null;
    }

    const isValid = nameRe.test(value.trim());

    return !isValid
      ? { forbiddenUrl: { invalidUrl: value } }
      : null;
  };
}
