import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || !Array.isArray(value)) {
      return null
    }

    const invalidUrls = value.filter((url: string) => !nameRe.test(url))

    return invalidUrls.length > 0
      ? { forbiddenName: { invalidUrls } }
      : null;
  };
}
