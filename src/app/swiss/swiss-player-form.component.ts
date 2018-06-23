import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Player } from '../shared';

@Component({
  selector: 'mm-swiss-player-form',
  templateUrl: 'swiss-player-form.component.html',
  styleUrls: ['swiss-player-form.component.css']
})
export class SwissPlayerFormComponent implements OnChanges {
  // hasBegunTournament = false;
  // isTournamentOver = false;
  @Input() player: Player;
  @Output() add = new EventEmitter<Player>();
  @Output() unselect = new EventEmitter<string>(); // TODO: Does this need a type?
  @Output() update = new EventEmitter<Player>();

  addMode = false;
  editingPlayer: Player;

  // TODO: Form validation.

  // ngOnInit() {
  //   this.createForm();
  //   this.playerService.selectedPlayer.subscribe(player => {
  //     this.currentPlayer = player;
  //     this.swissPlayerForm.reset({
  //       name: this.currentPlayer.name
  //     });
  //   });

  //   this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => {
  //     this.hasBegunTournament = hasBegun;
  //   });

  //   this.roundService.isTournamentOver.subscribe((isOver: boolean) => {
  //     this.isTournamentOver = isOver;

  //     if (isOver && this.hasBegunTournament) {
  //       this.swissPlayerForm.disable();
  //     } else {
  //       this.swissPlayerForm.enable();
  //     }
  //   });
  // }

  ngOnChanges(changes: SimpleChanges) {
    // TODO: Focus?
    if (this.player && this.player.id) {
      this.editingPlayer = { ...this.player };
      this.addMode = false;
    } else {
      this.editingPlayer = {
        id: null,
        name: ''
      };
      this.addMode = true;
    }
  }

  clear(): void {
    this.unselect.emit();
  }

  savePlayer(): void {
    if (this.addMode) {
      this.addPlayer();
    } else {
      this.updatePlayer();
    }
  }

  private addPlayer(): void {
    this.add.emit(this.editingPlayer);
    this.clear();
  }

  private updatePlayer(): void {
    this.update.emit(this.editingPlayer);
    this.clear();
  }

  // toggleCurrentPlayerDropped() {
  //   this.currentPlayer.dropped = !this.currentPlayer.dropped;
  //   this.playerService.save(this.currentPlayer);
  // }
}
