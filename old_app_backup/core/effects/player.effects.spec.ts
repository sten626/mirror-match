// import { TestBed } from '@angular/core/testing';
// import { PlayersApiActions } from '@mm/core/actions';
// import { PlayerStorageService } from '@mm/core/services';
// import { PlayersPageActions } from '@mm/players/actions';
// import { generateMockPlayer, Player } from '@mm/shared/models';
// import { Actions } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Update } from '@ngrx/entity';
// import { cold, hot } from 'jasmine-marbles';
// import { Observable } from 'rxjs';
// import { PlayerEffects } from './player.effects';

// describe('PlayerEffects', () => {
//   const player1 = generateMockPlayer();
//   // const player1NoId: Player = {
//   //   ...player1,
//   //   id: null
//   // };
//   let actions$: Observable<any>;
//   let effects: PlayerEffects;
//   const storageSpy = jasmine.createSpyObj('PlayerStorageService', [
//     'addPlayer',
//     'deletePlayer',
//     'getPlayers',
//     'updatePlayer'
//   ]);

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: PlayerStorageService, useValue: storageSpy },
//         PlayerEffects,
//         provideMockActions(() => actions$)
//       ]
//     });

//     effects = TestBed.inject(PlayerEffects);
//     actions$ = TestBed.inject(Actions);
//   });

//   it('should be created', () => {
//     expect(effects).toBeTruthy();
//   });

//   // describe('addPlayer', () => {
//   //   it('should create an addPlayerSuccess', () => {
//   //     const action = SetupPageActions.addPlayer({ player: player1NoId });
//   //     const completion = PlayersApiActions.addPlayerSuccess({
//   //       player: player1
//   //     });

//   //     actions$ = hot('-a', { a: action });
//   //     const response = cold('-a|', { a: player1 });
//   //     const expected = cold('--c', { c: completion });
//   //     storageSpy.addPlayer.and.returnValue(response);

//   //     expect(effects.addPlayer$).toBeObservable(expected);
//   //     expect(storageSpy.addPlayer).toHaveBeenCalledWith(player1NoId);
//   //   });

//   //   it('should create an addPlayerFailure when addPlayer throws an error', () => {
//   //     const action = SetupPageActions.addPlayer({ player: player1NoId });
//   //     const error = 'Cannot add nonexistent player.';
//   //     const completion = PlayersApiActions.addPlayerFailure({
//   //       player: player1NoId
//   //     });

//   //     actions$ = hot('-a', { a: action });
//   //     const response = cold('-#', {}, error);
//   //     const expected = cold('--c', { c: completion });
//   //     storageSpy.addPlayer.and.returnValue(response);

//   //     expect(effects.addPlayer$).toBeObservable(expected);
//   //   });
//   // });

//   describe('deletePlayer', () => {
//     it('should create a deletePlayerSuccess', () => {
//       const action = PlayersPageActions.deletePlayer({ id: player1.id });
//       const completion = PlayersApiActions.deletePlayerSuccess({
//         id: player1.id
//       });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-a|', { a: player1.id });
//       const expected = cold('--c', { c: completion });
//       storageSpy.deletePlayer.and.returnValue(response);

//       expect(effects.deletePlayer$).toBeObservable(expected);
//       expect(storageSpy.deletePlayer).toHaveBeenCalledWith(player1.id);
//     });

//     it('should create a deletePlayerFailure when deletePlayer throws an error', () => {
//       const action = PlayersPageActions.deletePlayer({ id: player1.id });
//       const error = 'Unable to delete player.';
//       const completion = PlayersApiActions.deletePlayerFailure({ err: error });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-#', {}, error);
//       const expected = cold('--c', { c: completion });
//       storageSpy.deletePlayer.and.returnValue(response);

//       expect(effects.deletePlayer$).toBeObservable(expected);
//       expect(storageSpy.deletePlayer).toHaveBeenCalledWith(player1.id);
//     });
//   });

//   describe('loadPlayers', () => {
//     it('should create a loadPlayersSuccess', () => {
//       const action = PlayersApiActions.loadPlayers();
//       const players = [player1];
//       const completion = PlayersApiActions.loadPlayersSuccess({ players });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-a|', { a: players });
//       const expected = cold('--c', { c: completion });
//       storageSpy.getPlayers.and.returnValue(response);

//       expect(effects.loadPlayers$).toBeObservable(expected);
//       expect(storageSpy.getPlayers).toHaveBeenCalled();
//     });

//     it('should create a loadPlayersFailure when getPlayers throws an error', () => {
//       const action = PlayersApiActions.loadPlayers();
//       const error = 'Failed to load players.';
//       const completion = PlayersApiActions.loadPlayersFailure({ err: error });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-#', {}, error);
//       const expected = cold('--c', { c: completion });
//       storageSpy.getPlayers.and.returnValue(response);

//       expect(effects.loadPlayers$).toBeObservable(expected);
//       expect(storageSpy.getPlayers).toHaveBeenCalled();
//     });
//   });

//   describe('updatePlayer', () => {
//     it('should create a updatePlayerSuccess', () => {
//       const update: Update<Player> = {
//         id: player1.id,
//         changes: {
//           name: 'Sten'
//         }
//       };
//       const action = PlayersPageActions.updatePlayer({ update });
//       const completion = PlayersApiActions.updatePlayerSuccess({ update });

//       actions$ = hot('-a', { a: action });
//       const newPlayer = {
//         ...player1,
//         name: 'Sten'
//       };
//       const response = cold('-a|', { a: newPlayer });
//       const expected = cold('--c', { c: completion });
//       storageSpy.updatePlayer.and.returnValue(response);

//       expect(effects.updatePlayer$).toBeObservable(expected);
//       expect(storageSpy.updatePlayer).toHaveBeenCalledWith(update);
//     });

//     it('should create a updatePlayerFailure when updatePlayer throws an error', () => {
//       const update: Update<Player> = {
//         id: player1.id,
//         changes: {
//           name: 'Sten'
//         }
//       };
//       const action = PlayersPageActions.updatePlayer({ update });
//       const error = 'Failed to update player.';
//       const completion = PlayersApiActions.updatePlayerFailure({ err: error });

//       actions$ = hot('-a', { a: action });
//       const response = cold('-#', {}, error);
//       const expected = cold('--c', { c: completion });
//       storageSpy.updatePlayer.and.returnValue(response);

//       expect(effects.updatePlayer$).toBeObservable(expected);
//       expect(storageSpy.updatePlayer).toHaveBeenCalledWith(update);
//     });
//   });

//   describe('onInitEffects', () => {
//     it('should return a loadPlayers', () => {
//       const completion = PlayersApiActions.loadPlayers();
//       const result = effects.ngrxOnInitEffects();

//       expect(result).toEqual(completion);
//     });
//   });
// });
