import { Pipe, PipeTransform } from '@angular/core';
import { Standing } from 'app/shared/models/standing.model';
import { standingsTiebreakerComparator } from 'app/shared/services/standings.service';

@Pipe({
  name: 'sortStandings'
})
export class SortStandingsPipe implements PipeTransform {
  transform(standings: Standing[]): Standing[] {
    if (standings) {
      return standings.sort(standingsTiebreakerComparator);
    }

    return standings;
  }
}
