import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BOTTOM_SHEET_DATA } from '@app/core/services/bottom-sheet-config';
import { newPlayerValidator } from '@app/shared/directives';
import { BottomSheetRef } from '@app/core/services/bottom-sheet-ref';

@Component({
  selector: 'mm-add-player-form',
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.scss']
})
export class AddPlayerFormComponent implements OnInit {
  // @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter<string>();

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

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['playerNames']) {
  //     this.playerGroup
  //       .get('name')
  //       .setValidators(newPlayerValidator(this.playerNames));
  //   }
  // }

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
    // this.addPlayer.emit(playerName);
    this.bottomSheetRef.dismiss(playerName);
  }

  log(msg: string) {
    console.log(msg);
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
