import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-round-info',
  templateUrl: './round-info.component.html'
})
export class RoundInfoComponent {
  @Input() completedRoundId: number;
  @Input() currentRoundId: number;
  @Input() numberOfRounds: number;
  @Input() ongoingMatches: number;
}
