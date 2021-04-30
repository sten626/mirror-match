import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function duplicatePlayerValidator(
  existingPlayerNames: Set<string>
): ValidatorFn {
  const lowerCaseNames = new Set<string>();

  for (const name of existingPlayerNames) {
    lowerCaseNames.add(name.toLowerCase());
  }

  return (control: FormControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const name: string = control.value.trim().toLowerCase();

    if (lowerCaseNames.has(name)) {
      return {
        playerExists: 'A player with this name is already in the tournament.'
      };
    }

    return null;
  };
}
