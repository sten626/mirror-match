import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { newPlayerValidator } from '@app/shared/new-player.validator';

@Component({
  selector: 'mm-add-player-form',
  templateUrl: './add-player-form.component.html',
  styleUrls: ['./add-player-form.component.scss']
})
export class AddPlayerFormComponent implements OnChanges {
  @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter<string>();

  playerGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerNames']) {
      this.playerGroup
        .get('name')
        .setValidators(newPlayerValidator(this.playerNames));
    }
  }

  clear() {
    this.playerGroup.reset({
      name: ''
    });
  }

  onSubmit() {
    const playerName = this.playerGroup.value['name'];
    this.addPlayer.emit(playerName);
  }
}
