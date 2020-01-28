import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TournamentEffects } from './tournament.effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('TournamentEffects', () => {
  let actions$: Observable<any>;
  let effects: TournamentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
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
