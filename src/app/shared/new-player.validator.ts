import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function newPlayerValidator(playerNames: Set<string>): ValidatorFn {
  return (control: FormControl): ValidationErrors | null => {
    console.log('validating');
    if (!control.value) {
      return null;
    }

    const newName: string = control.value.trim().toLowerCase();

    if (playerNames.has(newName)) {
      return { playerExists: 'A player with this name is already added.' };
    }

    return null;
  };
}
