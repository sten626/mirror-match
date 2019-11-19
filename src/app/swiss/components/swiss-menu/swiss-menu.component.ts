import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-swiss-menu',
  templateUrl: './swiss-menu.component.html'
})
export class SwissMenuComponent {
  @Input() hasCompletedRounds: boolean;
  @Input() hasTournamentStarted: boolean;
  @Input() numberOfActivePlayers: number;
}
