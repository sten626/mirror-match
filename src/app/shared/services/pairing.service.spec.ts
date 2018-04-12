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

  it('#createPairings test bad case change this name', () => {
    const playerA = new Player({
      id: 1,
      name: 'A',
      opponentIds: [2, 3],
      matchesPlayed: 2,
      matchesWon: 2
    });
    const playerB = new Player({
      id: 2,
      name: 'B',
      opponentIds: [1, 9],
      matchesPlayed: 2,
      matchesWon: 1
    });
    const playerC = new Player({
      id: 3,
      name: 'C',
      opponentIds: [1, 4],
      matchesPlayed: 2,
      matchesWon: 1
    });
    const playerD = new Player({
      id: 4,
      name: 'D',
      opponentIds: [3, 6],
      matchesPlayed: 2,
      matchesWon: 1
    });
    const playerE = new Player({
      id: 5,
      name: 'E',
      opponentIds: [6, 7],
      matchesPlayed: 2,
      matchesWon: 2
    });
    // const playerF = new Player({
    //   id: 6,
    //   name: 'F',
    //   opponentIds: [4, 5],
    //   matchesPlayed: 2
    // });
    const playerG = new Player({
      id: 7,
      name: 'G',
      opponentIds: [5, 8],
      matchesPlayed: 2,
      matchesWon: 1
    });
    const playerH = new Player({
      id: 8,
      name: 'H',
      opponentIds: [7],
      matchesPlayed: 1,
      byes: 1
    });
    const playerI = new Player({
      id: 9,
      name: 'I',
      opponentIds: [2],
      matchesPlayed: 1,
      byes: 1
    });
    const players = [playerA, playerB, playerC, playerD, playerE, playerG, playerH, playerI];
    const playersSubject = new BehaviorSubject<Player[]>(players);
    const fakePlayerService = {
      activePlayers: playersSubject.asObservable()
    };
    pairingService = new PairingService(fakePlayerService as PlayerService);
    pairingService.createPairings(3, false);
    pairingService.pairings.subscribe((pairings: Pairing[]) => {
      expect(pairings.length).toBe(4);
    });
  });
});
