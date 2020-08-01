import { Pipe, PipeTransform } from '@angular/core';
import { Standing } from '@mm/shared/models/standing.model';
import { standingsTiebreakerComparator } from '../comparators';

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
