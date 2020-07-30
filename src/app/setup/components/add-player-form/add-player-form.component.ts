import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { newPlayerValidator } from '@app/shared/directives';

@Component({
  selector: 'mm-add-player-form',
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.scss']
})
export class AddPlayerFormComponent {
  // @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter<string>();

  playerGroup: FormGroup;

  constructor() {
    this.createForm();
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
    this.addPlayer.emit(playerName);
  }

  private createForm() {
    this.playerGroup = new FormGroup({
      name: new FormControl(
        '',
        newPlayerValidator(new Set())
      )
    });
  }
}
