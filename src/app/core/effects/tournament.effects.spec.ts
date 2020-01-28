import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TournamentEffects } from './tournament.effects';

describe('TournamentEffects', () => {
  let actions$: Observable<any>;
  let effects: TournamentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TournamentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TournamentEffects>(TournamentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
