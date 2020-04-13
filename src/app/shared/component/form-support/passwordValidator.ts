import { AbstractControl } from '@angular/forms';
export function PasswordValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password');
  const confPassword = c.get('confPassword');
  return password && confPassword && password.value !== confPassword.value
    ? { misMatch: true }
    : null;
}
