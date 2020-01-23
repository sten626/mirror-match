import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { newPlayerValidator } from '@app/shared/new-player.validator';

@Component({
  selector: 'mm-player-edit-dialog',
  templateUrl: './player-edit-dialog.component.html',
  styleUrls: ['./player-edit-dialog.component.scss']
})
export class PlayerEditDialogComponent implements OnInit {
  name: FormControl;
  dropped: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    const otherPlayers = data.otherPlayers;
    this.name = new FormControl('', [Validators.required, newPlayerValidator(otherPlayers)]);
    this.dropped = new FormControl(false);
  }

  ngOnInit() {
    this.name.setValue(this.data.player.name);
    this.dropped.setValue(this.data.player.dropped);
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a name';
    } else if (this.name.hasError('playerAlreadyExists')) {
      return 'Player already exists';
    }

    return '';
  }

  isNameEmpty(): boolean {
    let name: string = this.name.value;

    if (!name) {
      return true;
    }

    name = name.trim();

    return name.length === 0;
  }
}
