import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-round-info',
  templateUrl: './round-info.component.html',
})
export class RoundInfoComponent {
  @Input() completedRoundId: number = 0;
  @Input() currentRoundId: number = 0;
  @Input() numberOfMatchesInProgress: number = 0;
  @Input() numberOfRounds: number = 0;
}
