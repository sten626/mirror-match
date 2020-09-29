import { Component, Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Player } from '@mm/shared/models';

@Directive({ selector: '[mmPlayerNameInput]' })
export class PlayerNameInputDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    input.focus();
  }
}

@Component({
  selector: 'mm-add-player-list-item',
  templateUrl: './add-player-list-item.component.html',
  styleUrls: ['./add-player-list-item.component.scss']
})
export class AddPlayerListItemComponent {
  @Output() addPlayer = new EventEmitter<Player>();

  adding = false;

  newPlayerForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  onSubmit() {
    const newPlayer: Player = {
      name: this.newPlayerForm.get('name').value,
      dropped: false
    };

    this.addPlayer.emit(newPlayer);
    this.newPlayerForm.reset();
    this.adding = false;
  }
}
