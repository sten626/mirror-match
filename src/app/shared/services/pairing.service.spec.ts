import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PairingService } from './pairing.service';
import { Pairing, Player } from '../models';
import { PlayerService } from './player.service';

describe('PairingService', () => {
  let pairingService: PairingService;

  beforeEach(() => {
    localStorage.clear();
  });

  it('#createPairings should give error with 0 players', () => {
    const fakeSubject = new BehaviorSubject<Player[]>([]);
    const fakePlayerService = {
      activePlayers: fakeSubject.asObservable()
    };
    pairingService = new PairingService(fakePlayerService as PlayerService);
    const createPairings = function() {
      pairingService.createPairings(1, false);
    };

    expect(createPairings).toThrowError(Error);
  });

  it('#createPairings should give a bye with 1 player', (done: DoneFn) => {
    const player = new Player({
      name: 'Steven'
    });

    const fakeSubject = new BehaviorSubject<Player[]>([player]);
    const fakePlayerService = {
      activePlayers: fakeSubject.asObservable()
    };
    pairingService = new PairingService(fakePlayerService as PlayerService);
    pairingService.createPairings(1, false);
    pairingService.pairings.subscribe((pairings: Pairing[]) => {
      expect(pairings.length).toBe(1);
      const pairing = pairings[0];
      expect(pairing.player1).toBe(player);
      expect(pairing.player2).toBeNull();
      done();
    });
  });

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
