import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-round-info',
  templateUrl: './round-info.component.html'
})
export class RoundInfoComponent {
  @Input() completedRound: number;
  @Input() currentRound: number;
  @Input() numberOfRounds: number;
  @Input() ongoingMatches: number;
}
