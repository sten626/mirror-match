import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PairingService } from './pairing.service';
import { Pairing, Player } from '../models';
import { PlayerService } from './player.service';

describe('PairingService', () => {
  let pairingService: PairingService;

  it('#createPairings should trigger the pairings Observable', (done: DoneFn) => {
    const player1 = new Player({
      name: 'Steven'
    });

    const player2 = new Player({
      name: 'Nylea'
    });
    const fakeActivePlayers = [player1, player2];
    const fakeSubject = new BehaviorSubject<Player[]>(fakeActivePlayers);
    const fakePlayerService = {
      activePlayers: fakeSubject.asObservable()
    };
    pairingService = new PairingService(fakePlayerService as PlayerService);
    pairingService.createPairings(1, false);
    pairingService.pairings.subscribe((pairings: Pairing[]) => {
      expect(pairings.length).toBe(1);
      const pairing = pairings[0];
      expect(fakeActivePlayers).toContain(pairing.player1);
      expect(fakeActivePlayers).toContain(pairing.player2);
      done();
    });
  });
});
