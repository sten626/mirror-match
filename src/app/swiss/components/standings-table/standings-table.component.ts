import { Component, Input } from '@angular/core';
import { Player, Standing } from '@mm/shared/models';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'mm-standings-table',
  templateUrl: './standings-table.component.html'
})
export class StandingsTableComponent {
  @Input() playerEntities: Dictionary<Player>;
  @Input() standings: Standing[];
}
