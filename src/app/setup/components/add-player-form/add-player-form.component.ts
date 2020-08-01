import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BOTTOM_SHEET_DATA } from '@mm/core/services/bottom-sheet-config';
import { BottomSheetRef } from '@mm/core/services/bottom-sheet-ref';
import { newPlayerValidator } from '@mm/shared/directives';

@Component({
  selector: 'mm-add-player-form',
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.scss']
})
export class AddPlayerFormComponent implements OnInit {
  playerGroup: FormGroup;

  constructor(
    private bottomSheetRef: BottomSheetRef,
    @Inject(BOTTOM_SHEET_DATA) private data: any,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.createForm();
  }

  ngOnInit() {
    const input = this.document.querySelector<HTMLElement>('#add-player-input');

    if (input) {
      input.focus();
    }
  }

  clear() {
    this.playerGroup.reset({
      name: ''
    });
  }

  getErrorMessage(): string | null {
    const control = this.playerGroup.get('name');

    if (control.hasError('nameEmpty')) {
      return control.getError('nameEmpty');
    }

    if (control.hasError('playerExists')) {
      return control.getError('playerExists');
    }

    return null;
  }

  onSubmit() {
    const playerName = this.playerGroup.value['name'];
    this.bottomSheetRef.dismiss(playerName);
  }

  private createForm() {
    this.playerGroup = new FormGroup({
      name: new FormControl(
        '',
        newPlayerValidator(this.data.playerNames || new Set())
      )
    });
  }
}
