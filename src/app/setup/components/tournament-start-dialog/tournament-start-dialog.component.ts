import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mm-tournament-start-dialog',
  templateUrl: './tournament-start-dialog.component.html',
  styleUrls: ['./tournament-start-dialog.component.scss']
})
export class TournamentStartDialogComponent implements OnInit {
  totalRounds: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.totalRounds = new FormControl(3);
  }

  ngOnInit() {
    this.totalRounds.setValue(this.data.recommendedTotalRounds);
  }
}
