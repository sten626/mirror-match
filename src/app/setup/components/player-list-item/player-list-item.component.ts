import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent implements OnChanges {
  @Input() isEditing = false;
  @Input() player: Player;
  @Output() updatePlayer = new EventEmitter<Update<Player>>();

  playerForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  ngOnChanges() {
    this.playerForm.reset({
      name: this.player.name
    });
  }

  // edit() {
  //   this.isEditing = true;
  // }

  submit() {
    this.updatePlayer.emit({
      id: this.player.id,
      changes: {
        name: this.playerForm.value['name']
      }
    });
  }
}
