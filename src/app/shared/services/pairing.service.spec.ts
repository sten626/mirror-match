// import { BehaviorSubject } from 'rxjs';

// import { PairingService } from './pairing.service';
// import { Pairing, Player } from '../models';
// import { PlayerService } from './player.service';

// describe('PairingService', () => {
//   let pairingService: PairingService;

//   beforeEach(() => {
//     localStorage.clear();
//   });

//   it('#createPairings should give error with 0 players', () => {
//     const fakeSubject = new BehaviorSubject<Player[]>([]);
//     const fakePlayerService = {
//       activePlayers$: fakeSubject.asObservable()
//     };
//     pairingService = new PairingService(fakePlayerService as PlayerService);
//     const createPairings = function() {
//       pairingService.createPairings(1, false);
//     };

//     expect(createPairings).toThrowError(Error);
//   });

//   it('#createPairings should give a bye with 1 player', (done: DoneFn) => {
//     const player = new Player({
//       name: 'Steven'
//     });

//     const fakeSubject = new BehaviorSubject<Player[]>([player]);
//     const fakePlayerService = {
//       activePlayers$: fakeSubject.asObservable()
//     };
//     pairingService = new PairingService(fakePlayerService as PlayerService);
//     pairingService.createPairings(1, false);
//     pairingService.pairings$.subscribe((pairings: Pairing[]) => {
//       expect(pairings.length).toBe(1);
//       const pairing = pairings[0];
//       expect(pairing.player1).toBe(player);
//       expect(pairing.player2).toBeNull();
//       done();
//     });
//   });

//   it('#createPairings should trigger the pairings Observable', (done: DoneFn) => {
//     const player1 = new Player({
//       name: 'Steven'
//     });

//     const player2 = new Player({
//       name: 'Nylea'
//     });
//     const fakeActivePlayers = [player1, player2];
//     const fakeSubject = new BehaviorSubject<Player[]>(fakeActivePlayers);
//     const fakePlayerService = {
//       activePlayers$: fakeSubject.asObservable()
//     };
//     pairingService = new PairingService(fakePlayerService as PlayerService);
//     pairingService.createPairings(1, false);
//     pairingService.pairings$.subscribe((pairings: Pairing[]) => {
//       expect(pairings.length).toBe(1);
//       const pairing = pairings[0];
//       expect(fakeActivePlayers).toContain(pairing.player1);
//       expect(fakeActivePlayers).toContain(pairing.player2);
//       done();
//     });
//   });

//   it('#createPairings test giving bye to wrong player', () => {
//     const playerA = new Player({
//       id: 1,
//       name: 'A',
//       opponentIds: [2, 3],
//       matchesPlayed: 2,
//       matchesWon: 2,
//       matchPoints: 6
//     });
//     const playerB = new Player({
//       id: 2,
//       name: 'B',
//       opponentIds: [1, 9],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3
//     });
//     const playerC = new Player({
//       id: 3,
//       name: 'C',
//       opponentIds: [1, 4],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3
//     });
//     const playerD = new Player({
//       id: 4,
//       name: 'D',
//       opponentIds: [3, 6],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3
//     });
//     const playerE = new Player({
//       id: 5,
//       name: 'E',
//       opponentIds: [6, 7],
//       matchesPlayed: 2,
//       matchesWon: 2,
//       matchPoints: 6
//     });
//     const playerF = new Player({
//       id: 6,
//       name: 'F',
//       opponentIds: [4, 5],
//       matchesPlayed: 2,
//       matchPoints: 0
//     });
//     const playerG = new Player({
//       id: 7,
//       name: 'G',
//       opponentIds: [5, 8],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3
//     });
//     const playerH = new Player({
//       id: 8,
//       name: 'H',
//       opponentIds: [7],
//       matchesPlayed: 1,
//       byes: 1,
//       matchPoints: 3
//     });
//     const playerI = new Player({
//       id: 9,
//       name: 'I',
//       opponentIds: [2],
//       matchesPlayed: 1,
//       byes: 1,
//       matchPoints: 3
//     });
//     const players = [playerA, playerE, playerD, playerC, playerG, playerH, playerB, playerI, playerF];
//     const playersSubject = new BehaviorSubject<Player[]>(players);
//     const fakePlayerService = {
//       activePlayers$: playersSubject.asObservable()
//     };
//     pairingService = new PairingService(fakePlayerService as PlayerService);
//     pairingService.createPairings(3, false);
//     pairingService.pairings$.subscribe((pairings: Pairing[]) => {
//       expect(pairings.length).toBe(5);
//       const lastPairing = pairings[pairings.length - 1];
//       expect(lastPairing.player2).toBeNull();
//       expect(lastPairing.player1).toBe(playerF);
//     });
//   });

//   it('#createPairings fail to pair last round.', () => {
//     const playerA = new Player({
//       id: 1,
//       name: 'A',
//       opponentIds: [3, 6],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3,
//       opponentMatchWinPercentage: 75,
//       gameWinPercentage: 50,
//       opponentGameWinPercentage: 75
//     });
//     const playerB = new Player({
//       id: 2,
//       name: 'B',
//       opponentIds: [4, 5],
//       matchesPlayed: 2,
//       matchesWon: 2,
//       matchPoints: 6,
//       opponentMatchWinPercentage: 33.3333,
//       gameWinPercentage: 100,
//       opponentGameWinPercentage: 33.3333
//     });
//     const playerC = new Player({
//       id: 3,
//       name: 'C',
//       opponentIds: [1, 4],
//       matchesPlayed: 2,
//       matchesWon: 1,
//       matchPoints: 3,
//       opponentMatchWinPercentage: 41.6667,
//       gameWinPercentage: 50,
//       opponentGameWinPercentage: 41.6667
//     });
//     const playerD = new Player({
//       id: 4,
//       name: 'D',
//       opponentIds: [2, 3],
//       matchesPlayed: 2,
//       matchesWon: 0,
//       matchPoints: 0,
//       opponentMatchWinPercentage: 75,
//       gameWinPercentage: 0,
//       opponentGameWinPercentage: 75
//     });
//     const playerE = new Player({
//       id: 5,
//       name: 'E',
//       opponentIds: [6, 2],
//       matchesPlayed: 2,
//       matchesWon: 0,
//       matchPoints: 0,
//       opponentMatchWinPercentage: 100,
//       gameWinPercentage: 0,
//       opponentGameWinPercentage: 100
//     });
//     const playerF = new Player({
//       id: 6,
//       name: 'F',
//       opponentIds: [1, 5],
//       matchesPlayed: 2,
//       matchesWon: 2,
//       matchPoints: 6,
//       opponentMatchWinPercentage: 41.6667,
//       gameWinPercentage: 100,
//       opponentGameWinPercentage: 41.6667
//     });
//     const players = [playerA, playerE, playerD, playerC, playerB, playerF];
//     const playersSubject = new BehaviorSubject<Player[]>(players);
//     const fakePlayerService = {
//       activePlayers$: playersSubject.asObservable()
//     };
//     pairingService = new PairingService(fakePlayerService as PlayerService);
//     pairingService.createPairings(3, true);
//     pairingService.pairings$.subscribe((pairings: Pairing[]) => {
//       expect(pairings.length).toBe(3);
//     });
//   });
// });
