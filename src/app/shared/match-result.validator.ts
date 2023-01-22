import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchResultValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const player1Wins: number = control.get('player1Wins')?.value;
  const player2Wins: number = control.get('player2Wins')?.value;
  const draws: number = control.get('draws')?.value;
  const gamesPlayed: number = player1Wins + player2Wins + draws;
  const error = { matchResultInvalid: true };

  if (gamesPlayed < 1) {
    return error;
  }

  if (player1Wins < 0 || player1Wins > 2) {
    return error;
  }

  if (player2Wins < 0 || player2Wins > 2) {
    return error;
  }

  if (player1Wins + player2Wins > 3) {
    return error;
  }

  if (draws < 0) {
    return error;
  }

  return null;
};
