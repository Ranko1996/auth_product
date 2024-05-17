import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/g.test(value);
    const hasNumbers = /[0-9]/g.test(value);
    const validLength = value.length >= 8;
    const numberCount = (value.match(/\d/g) || []).length;
    const specialCharacterCount = (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;

    const passwordValid = hasUpperCase && validLength && numberCount >= 3 && specialCharacterCount >= 2;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
