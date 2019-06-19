import { Pipe, PipeTransform } from '@angular/core';
import { Standing } from 'app/shared';

@Pipe({
  name: 'sortStandings'
})
export class SortStandingsPipe implements PipeTransform {
  standingsComparator(a: Standing, b: Standing): number {
    if (a.matchPoints !== b.matchPoints) {
      return b.matchPoints - a.matchPoints;
    }

    if (a.opponentMatchWinPercentage !== b.opponentMatchWinPercentage) {
      return b.opponentMatchWinPercentage - a.opponentMatchWinPercentage;
    }

    if (a.gameWinPercentage !== b.gameWinPercentage) {
      return b.gameWinPercentage - a.gameWinPercentage;
    }

    return b.opponentGameWinPercentage - a.opponentGameWinPercentage;
  }

  transform(standings: Standing[]): Standing[] {
    return standings.sort(this.standingsComparator);
  }
}
