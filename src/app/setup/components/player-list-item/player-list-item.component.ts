import {
  Component,
  ElementRef,
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
  @Input() player: Player;
  @Output() updatePlayer = new EventEmitter<Update<Player>>();

  isEditing = false;
  playerForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnChanges() {
    this.playerForm.reset({
      name: this.player.name
    });
  }

  edit() {
    this.isEditing = true;
    const element = this.elementRef.nativeElement.querySelector('input');
    setTimeout(() => element.focus(), 10);
  }

  submit() {
    this.updatePlayer.emit({
      id: this.player.id,
      changes: {
        name: this.playerForm.value['name']
      }
    });
    this.isEditing = false;
  }
}
