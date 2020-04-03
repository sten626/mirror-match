import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { SwissEffects } from './swiss.effects';

describe('SwissEffects', () => {
  let actions$: Observable<any>;
  let effects: SwissEffects;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        SwissEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SwissEffects);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
