import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'mm-tournament-start-dialog',
  templateUrl: './tournament-start-dialog.component.html',
  styleUrls: ['./tournament-start-dialog.component.scss']
})
export class TournamentStartDialogComponent implements OnInit {
  bestOf = new FormControl('3');
  bestOfChoice = '3';
  bestOfChoices = new Map<string, string>([
    ['1', 'Best of 1'],
    ['3', 'Best of 3']
  ]);
  createDraftPods = new FormControl(true);
  totalRounds: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.totalRounds = new FormControl(3);
  }

  ngOnInit() {
    this.totalRounds.setValue(this.data.recommendedTotalRounds);
  }

  onBestOfChange(change: MatRadioChange) {
    this.bestOfChoice = change.value;
  }
}
