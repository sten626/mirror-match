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

    const name = (control.value as string).trim();
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseNames.has(lowerCaseName)) {
      return {
        playerExists: `A player named ${name} is already in the tournament.`
      };
    }

    return null;
  };
}
