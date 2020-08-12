import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BOTTOM_SHEET_DATA } from '@mm/core/services/bottom-sheet-config';
import { BottomSheetRef } from '@mm/core/services/bottom-sheet-ref';
import { newPlayerValidator } from '@mm/shared/directives';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-player-sheet',
  templateUrl: './player-sheet.component.html',
  styleUrls: ['./player-sheet.component.scss']
})
export class PlayerSheetComponent implements OnInit {
  editPlayer: Player;
  playerGroup: FormGroup;

  constructor(
    private bottomSheetRef: BottomSheetRef,
    @Inject(BOTTOM_SHEET_DATA) private data: any,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.editPlayer = this.data.player || null;
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

  submit() {
    const playerName = this.playerGroup.value['name'];
    this.bottomSheetRef.dismiss(playerName);
  }

  private createForm() {
    const playerNames = this.data.playerNames || new Set();

    if (this.editPlayer) {
      this.playerGroup = new FormGroup({
        name: new FormControl(
          this.editPlayer.name,
          newPlayerValidator(playerNames)
        ),
        dropped: new FormControl(this.editPlayer.dropped)
      });
    } else {
      this.playerGroup = new FormGroup({
        name: new FormControl('', newPlayerValidator(playerNames)),
        dropped: new FormControl(false)
      });
    }
  }
}
