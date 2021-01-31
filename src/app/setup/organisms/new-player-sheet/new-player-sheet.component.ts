import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'mm-new-player-sheet',
  templateUrl: './new-player-sheet.component.html',
  styleUrls: ['./new-player-sheet.component.scss']
})
export class NewPlayerSheetComponent {
  name = new FormControl('');

  constructor(private bottomSheetRef: MatBottomSheetRef) {}

  submit() {
    // TODO: Validation
    this.bottomSheetRef.dismiss(this.name.value);
  }
}
