import { Player, Pairing } from '../models';
import { StandingsService } from './standings.service';
import { BehaviorSubject } from 'rxjs';
import { PairingService, PlayerService } from '.';

describe('StandingsService', () => {
  let service: StandingsService;
  let players: Player[];
  let pairings: Pairing[];

  beforeEach(() => {
    localStorage.clear();
    players = [
      new Player({
        id: 1,
        name: 'Steven'
      }),
      new Player({
        id: 2,
        name: 'Esther'
      }),
      new Player({
        id: 3,
        name: 'Nylea'
      }),
      new Player({
        id: 4,
        name: 'Jasper'
      })
    ];

    pairings = [
      new Pairing(1, 1, players[0], players[1], 2, 0, 0, true),
      new Pairing(1, 2, players[2], players[3], 2, 0, 0, true),
      new Pairing(2, 1, players[0], players[2], 2, 0, 0, true),
      new Pairing(2, 2, players[1], players[3], 1, 1, 1, true)
    ];
  });

  it('#calculateStandings should do nothing if there aren\'t any players', () => {
    const playersSubject = new BehaviorSubject<Player[]>([]);
    const fakePlayerService = {
      players$: playersSubject.asObservable()
    };
    const submittedPairingsSubject = new BehaviorSubject<Pairing[]>([]);
    const fakePairingService = {
      submittedPairings: submittedPairingsSubject.asObservable()
    };

    service = new StandingsService(fakePairingService as PairingService, fakePlayerService as PlayerService);
    service = service as any; // Get around TSLint unused warning.
  });

  it('#calculateStandings should round tiebreakers correctly', () => {
    const playersSubject = new BehaviorSubject<Player[]>(players);
    const fakePlayerService = {
      players$: playersSubject.asObservable(),
      saveAll: () => {}
    };
    const submittedPairingsSubject = new BehaviorSubject<Pairing[]>(pairings);
    const fakePairingService = {
      submittedPairings: submittedPairingsSubject.asObservable()
    };

    service = new StandingsService(fakePairingService as PairingService, fakePlayerService as PlayerService);

    expect(players[0].opponentMatchWinPercentage).toBeCloseTo(5 / 12 * 100);
    expect(players[0].opponentGameWinPercentage).toBeCloseTo(5 / 12 * 100);
    expect(players[1].opponentMatchWinPercentage).toBeCloseTo(2 / 3 * 100);
    expect(players[1].opponentGameWinPercentage).toBeCloseTo(2 / 3 * 100);
    expect(players[2].opponentMatchWinPercentage).toBeCloseTo(2 / 3 * 100);
    expect(players[2].opponentGameWinPercentage).toBeCloseTo(2 / 3 * 100);
    expect(players[3].opponentMatchWinPercentage).toBeCloseTo(5 / 12 * 100);
    expect(players[3].opponentGameWinPercentage).toBeCloseTo(5 / 12 * 100);
  });
});
