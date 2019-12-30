import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mm-player-edit-dialog',
  templateUrl: './player-edit-dialog.component.html',
  styleUrls: ['./player-edit-dialog.component.scss']
})
export class PlayerEditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
