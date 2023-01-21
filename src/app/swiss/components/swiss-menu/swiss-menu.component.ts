import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-swiss-menu',
  templateUrl: './swiss-menu.component.html',
})
export class SwissMenuComponent {
  @Input() hasCompletedRounds: boolean | null = false;
  @Input() hasTournamentStarted: boolean | null = false;
  @Input() numberOfActivePlayers: number | null = 0;
}
