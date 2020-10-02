import { DOCUMENT } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { newPlayerValidator } from '@mm/shared/directives';
import { Player } from '@mm/shared/models';

@Directive({ selector: '[mmPlayerNameInput]' })
export class PlayerNameInputDirective implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef<HTMLInputElement>
  ) {}

  ngOnInit() {
    window.scrollTo(0, this.document.body.scrollHeight);
    this.elementRef.nativeElement.focus();
  }
}

@Component({
  selector: 'mm-add-player-list-item',
  templateUrl: './add-player-list-item.component.html',
  styleUrls: ['./add-player-list-item.component.scss']
})
export class AddPlayerListItemComponent implements OnChanges {
  @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter<Player>();

  adding = false;

  newPlayerForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {}

  ngOnChanges() {
    this.newPlayerForm
      .get('name')
      .setValidators(newPlayerValidator(this.playerNames));
  }

  getErrorMessage(): string | null {
    const control = this.newPlayerForm.get('name');

    if (control.hasError('nameEmpty')) {
      return control.getError('nameEmpty');
    }

    if (control.hasError('playerExists')) {
      return control.getError('playerExists');
    }

    return null;
  }

  onBlur() {
    this.adding = false;
    this.newPlayerForm.reset();
  }

  onSubmit() {
    if (this.newPlayerForm.valid) {
      const newPlayer: Player = {
        name: this.newPlayerForm.get('name').value,
        dropped: false
      };

      this.addPlayer.emit(newPlayer);
      this.newPlayerForm.reset();
      this.adding = false;
    }
  }
}
