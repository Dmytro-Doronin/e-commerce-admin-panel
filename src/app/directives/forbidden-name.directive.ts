import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Если значение отсутствует или не является массивом, валидатор ничего не делает
    if (!value || !Array.isArray(value)) {
      return null;
    }

    // Проверяем каждую строку в массиве
    const invalidUrls = value.filter((url: string) => {
      // Убедимся, что строка соответствует регулярному выражению полностью
      return !nameRe.test(url.trim());
    });

    // Если есть недопустимые URL, возвращаем ошибку
    return invalidUrls.length > 0
      ? { forbiddenName: { invalidUrls } }
      : null;
  };
}
// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//
//     if (!value || !Array.isArray(value)) {
//       return null
//     }
//
//     const invalidUrls = value.filter((url: string) => !nameRe.test(url))
//
//     return invalidUrls.length > 0
//       ? { forbiddenName: { invalidUrls } }
//       : null;
//   };
// }
