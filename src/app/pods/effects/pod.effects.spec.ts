import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PodEffects } from './pod.effects';

describe('PodEffects', () => {
  let actions$: Observable<any>;
  let effects: PodEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PodEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<PodEffects>(PodEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
