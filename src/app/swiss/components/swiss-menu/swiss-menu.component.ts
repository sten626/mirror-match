import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-swiss-menu',
  templateUrl: './swiss-menu.component.html',
})
export class SwissMenuComponent {
  @Input() hasCompletedRounds: boolean = false;
  @Input() hasTournamentStarted: boolean = false;
  @Input() numberOfActivePlayers: number = 0;
}
