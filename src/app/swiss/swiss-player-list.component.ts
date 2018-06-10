import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent {
  // hasBegunTournament = false;
  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Output() deleted = new EventEmitter<Player>();
  @Output() selected = new EventEmitter<Player>();

  constructor() {}

  // ngOnInit() {
  //   // this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasBegunTournament = hasBegun);
  // }

  deletePlayer(player: Player): void {
    this.deleted.emit(player);
  }

  selectPlayer(player: Player): void {
    this.selected.emit(player);
  }
}
