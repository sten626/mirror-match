import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mm-player-edit-dialog',
  templateUrl: './player-edit-dialog.component.html',
  styleUrls: ['./player-edit-dialog.component.scss']
})
export class PlayerEditDialogComponent implements OnInit {
  name = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    this.name.setValue(this.data.player.name);
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    }

    return '';
  }
}
