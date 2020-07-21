import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function newPlayerValidator(playerNames: Set<string>): ValidatorFn {
  return (control: FormControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const newName: string = control.value.trim().toLowerCase();

    if (!newName) {
      return { nameEmpty: 'Name can\'t be empty.' };
    }

    if (playerNames.has(newName)) {
      return { playerExists: 'A player with this name is already added.' };
    }

    return null;
  };
}
