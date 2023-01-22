import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Pairing, Player } from 'app/shared/models';

@Pipe({
  name: 'pairingsFilter',
})
export class PairingsFilterPipe implements PipeTransform {
  transform(
    pairings: Pairing[],
    playerEntities: Dictionary<Player>,
    filterText: string,
    showOutstandingOnly: boolean
  ): Pairing[] {
    return pairings.filter((pairing) => {
      if (showOutstandingOnly && pairing.submitted) {
        return false;
      }

      if (pairing.table.toString() === filterText) {
        return true;
      }

      const player1Name = playerEntities[pairing.player1Id]!.name;

      if (player1Name.toLowerCase().includes(filterText)) {
        return true;
      }

      if (pairing.player2Id) {
        const player2Name = playerEntities[pairing.player2Id]!.name;

        if (player2Name.toLowerCase().includes(filterText)) {
          return true;
        }
      }

      return false;
    });
  }
}
