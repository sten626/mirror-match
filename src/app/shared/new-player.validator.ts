import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Player } from '@app/shared/models';

export function newPlayerValidator(players: Player[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let newPlayerName: string = control.value;

    if (!newPlayerName) {
      return null;
    }

    newPlayerName = newPlayerName.trim().toLowerCase();

    for (const player of players) {
      if (player.name.toLowerCase() === newPlayerName) {
        return {
          'playerAlreadyExists': true
        };
      }
    }

    return null;
  };
}