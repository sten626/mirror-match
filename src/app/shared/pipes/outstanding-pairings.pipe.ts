import { Pipe, PipeTransform } from '@angular/core';

import { Pairing } from '../models';

@Pipe({name: 'outstandingPairings'})
export class OutstandingPairingsPipe implements PipeTransform {
  transform(pairings: Pairing[], outstandingOnly: boolean) {
    if (!outstandingOnly) {
      return pairings;
    }

    return pairings.filter(pairing => !pairing.submitted);
  }
}
