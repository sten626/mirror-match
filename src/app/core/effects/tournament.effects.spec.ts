import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TournamentApiActions } from '@app/core/actions';
import { DraftPodService } from '@app/core/services/draft-pod.service';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import * as fromRoot from '@app/reducers';
import { SetupPageActions } from '@app/setup/actions';
import { TournamentInfo } from '@app/shared/models';
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
  let draftPodSpy: jasmine.SpyObj<DraftPodService>;
  let storageSpy: jasmine.SpyObj<TournamentStorageService>;

  beforeEach(() => {
    draftPodSpy = jasmine.createSpyObj('DraftPodService', ['buildPods']);
    storageSpy = jasmine.createSpyObj('TournamentStorageService', [
      'setDraftPods',
      'setTournamentInfo'
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: DraftPodService, useValue: draftPodSpy },
        { provide: TournamentStorageService, useValue: storageSpy },
        TournamentEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: fromRoot.selectActivePlayerIds,
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

  describe('setTournamentInfoSuccess', () => {
    it('should navigate to /pods if isDraft is true', () => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      actions$ = of(
        TournamentApiActions.setTournamentInfoSuccess({ tournamentInfo })
      );
      effects.setTournamentInfoSuccess$.subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/pods']);
    });

    it('should navigate to /pairings if isDraft is false', () => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        isDraft: false,
        totalRounds: 3
      };
      actions$ = of(
        TournamentApiActions.setTournamentInfoSuccess({ tournamentInfo })
      );
      effects.setTournamentInfoSuccess$.subscribe();
      expect(router.navigate).toHaveBeenCalledWith(['/pairings']);
    });
  });

  describe('startTournament', () => {
    it('should create a setTournamentInfoSuccess', () => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament({ tournamentInfo });
      const completion = TournamentApiActions.setTournamentInfoSuccess({
        tournamentInfo
      });

      actions$ = hot('-a', { a: action });
      const setTournamentInfoResponse = cold('-a|', { a: { tournamentInfo } });
      const expected = cold('--c', { c: completion });
      storageSpy.setTournamentInfo.and.returnValue(setTournamentInfoResponse);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setTournamentInfo).toHaveBeenCalledWith(tournamentInfo);
    });

    it('should create a setTournamentInfoFailure if setTournamentInfo fails', () => {
      const tournamentInfo: TournamentInfo = {
        bestOf: 3,
        isDraft: true,
        totalRounds: 3
      };
      const action = SetupPageActions.startTournament({ tournamentInfo });
      const error = 'Failed to save tournament info';
      const completion = TournamentApiActions.setTournamentInfoFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      storageSpy.setTournamentInfo.and.returnValue(response);

      expect(effects.startTournament$).toBeObservable(expected);
      expect(storageSpy.setTournamentInfo).toHaveBeenCalledWith(tournamentInfo);
    });
  });
});
