import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TournamentApiActions } from '@app/core/actions';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import * as fromRoot from '@app/reducers';
import { SetupPageActions } from '@app/setup/actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { TournamentEffects } from './tournament.effects';

describe('TournamentEffects', () => {
  let actions$: Observable<any>;
  let effects: TournamentEffects;
  let router: Router;
  let store: MockStore<fromRoot.State>;
  const storageSpy = jasmine.createSpyObj('TournamentStorageService', [
    'setBestOf',
    'setDraftPods',
    'setIsDraft',
    'setTotalRounds'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: TournamentStorageService, useValue: storageSpy },
        TournamentEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: fromRoot.getActivePlayerIds,
              value: [1, 2, 3, 4, 5, 6, 7, 8]
            }
          ]
        })
      ]
    });

    effects = TestBed.get<TournamentEffects>(TournamentEffects);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(store, 'pipe').and.callThrough();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('startDraft', () => {
    it('should call setDraftPods', () => {
      actions$ = of(SetupPageActions.startDraft());
      effects.startDraft$.subscribe();
      expect(storageSpy.setDraftPods).toHaveBeenCalled();
    });

    it('should fail if setDraftPods fails', () => {
      const action = SetupPageActions.startDraft();
      const err = 'At least 6 players needed to create draft pods.';
      const completion = TournamentApiActions.startDraftFailure({err});
      actions$ = hot('-a', {a: action});
      const response = cold('-#', {}, err);
      const expected = cold('--c', {c: completion});
      storageSpy.setDraftPods.and.returnValue(response);

      expect(effects.startDraft$).toBeObservable(expected);
    });
  });

  describe('startTournamentSuccess', () => {
    it('should navigate to /pods if isDraft is true', () => {
      actions$ = of(
        TournamentApiActions.startTournamentSuccess({
          bestOf: 3,
          isDraft: true,
          totalRounds: 3
        })
      );
      effects.startTournamentSuccess$.subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/pods']);
    });

    it('should navigate to /pairings if isDraft is true', () => {
      actions$ = of(
        TournamentApiActions.startTournamentSuccess({
          bestOf: 3,
          isDraft: false,
          totalRounds: 3
        })
      );
      effects.startTournamentSuccess$.subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/pairings']);
    });
  });

  describe('startTournament', () => {
    it('should create a startTournamentSuccess', () => {
      const data = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament(data);
      const completion = TournamentApiActions.startTournamentSuccess(data);

      actions$ = hot('-a', { a: action });
      const bestOfResponse = cold('-a|', { a: 3 });
      const isDraftResponse = cold('-a|', { a: true });
      const totalRoundsResponse = cold('-a|', { a: 3 });
      const expected = cold('--c', { c: completion });
      storageSpy.setBestOf.and.returnValue(bestOfResponse);
      storageSpy.setIsDraft.and.returnValue(isDraftResponse);
      storageSpy.setTotalRounds.and.returnValue(totalRoundsResponse);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setBestOf).toHaveBeenCalledWith(data.bestOf);
      expect(storageSpy.setIsDraft).toHaveBeenCalledWith(data.isDraft);
      expect(storageSpy.setTotalRounds).toHaveBeenCalledWith(data.totalRounds);
    });

    it('should create a startTournamentFailure if setBestOf fails', () => {
      const data = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament(data);
      const error = 'Failed to set bestOf';
      const completion = TournamentApiActions.startTournamentFailure({
        err: error
      });

      actions$ = hot('-a', { a: action });
      const bestOfResponse = cold('-#', {}, error);
      const isDraftResponse = cold('-a|', { a: true });
      const totalRoundsResponse = cold('-a|', { a: 3 });
      const expected = cold('--c', { c: completion });
      storageSpy.setBestOf.and.returnValue(bestOfResponse);
      storageSpy.setIsDraft.and.returnValue(isDraftResponse);
      storageSpy.setTotalRounds.and.returnValue(totalRoundsResponse);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setBestOf).toHaveBeenCalledWith(data.bestOf);
      expect(storageSpy.setIsDraft).toHaveBeenCalledWith(data.isDraft);
      expect(storageSpy.setTotalRounds).toHaveBeenCalledWith(data.totalRounds);
    });

    it('should create a startTournamentFailure if setIsDraft fails', () => {
      const data = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament(data);
      const error = 'Failed to set isDraft';
      const completion = TournamentApiActions.startTournamentFailure({
        err: error
      });

      actions$ = hot('-a', { a: action });
      const bestOfResponse = cold('-a|', { a: 3 });
      const isDraftResponse = cold('-#', {}, error);
      const totalRoundsResponse = cold('-a|', { a: 3 });
      const expected = cold('--c', { c: completion });
      storageSpy.setBestOf.and.returnValue(bestOfResponse);
      storageSpy.setIsDraft.and.returnValue(isDraftResponse);
      storageSpy.setTotalRounds.and.returnValue(totalRoundsResponse);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setBestOf).toHaveBeenCalledWith(data.bestOf);
      expect(storageSpy.setIsDraft).toHaveBeenCalledWith(data.isDraft);
      expect(storageSpy.setTotalRounds).toHaveBeenCalledWith(data.totalRounds);
    });

    it('should create a startTournamentFailure if setTotalRounds fails', () => {
      const data = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament(data);
      const error = 'Failed to set totalRounds';
      const completion = TournamentApiActions.startTournamentFailure({
        err: error
      });

      actions$ = hot('-a', { a: action });
      const bestOfResponse = cold('-a|', { a: 3 });
      const isDraftResponse = cold('-a|', { a: true });
      const totalRoundsResponse = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      storageSpy.setBestOf.and.returnValue(bestOfResponse);
      storageSpy.setIsDraft.and.returnValue(isDraftResponse);
      storageSpy.setTotalRounds.and.returnValue(totalRoundsResponse);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setBestOf).toHaveBeenCalledWith(data.bestOf);
      expect(storageSpy.setIsDraft).toHaveBeenCalledWith(data.isDraft);
      expect(storageSpy.setTotalRounds).toHaveBeenCalledWith(data.totalRounds);
    });
  });
});
