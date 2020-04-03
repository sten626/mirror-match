import { Component, Input } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Player, Standing } from '@app/shared';

@Component({
  selector: 'mm-standings-table',
  templateUrl: './standings-table.component.html'
})
export class StandingsTableComponent {
  @Input() playerEntities: Dictionary<Player>;
  @Input() standings: Standing[];
}
