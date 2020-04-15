import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mm-tournament-start-dialog',
  templateUrl: './tournament-start-dialog.component.html'
})
export class TournamentStartDialogComponent {
  tournamentStartForm: FormGroup;
  bestOfChoice = '3';
  bestOfChoices = new Map<string, string>([
    ['1', 'Best of 1'],
    ['3', 'Best of 3']
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.tournamentStartForm = new FormGroup({
      bestOf: new FormControl('3'),
      isDraft: new FormControl(true),
      totalRounds: new FormControl(data.recommendedTotalRounds)
    });
  }
}
