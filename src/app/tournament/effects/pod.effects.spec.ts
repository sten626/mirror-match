import { TestBed } from '@angular/core/testing';
import { PodsStorageService } from '@app/core/services';
import { Pod } from '@app/shared/models';
import { PodsApiActions, PodsPageActions } from '@app/tournament/actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { PodEffects } from './pod.effects';

describe('PodEffects', () => {
  let actions$: Observable<any>;
  let effects: PodEffects;
  // let mockStore: MockStore;
  let storageSpy: jasmine.SpyObj<PodsStorageService>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('PodsStorageService', ['getPods']);

    TestBed.configureTestingModule({
      providers: [
        { provide: PodsStorageService, useValue: storageSpy },
        PodEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject<PodEffects>(PodEffects);
    // mockStore = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPods$', () => {
    it('should return loadPodsSuccess if some existed', (done: DoneFn) => {
      actions$ = of(PodsPageActions.enter());

      const pods: Pod[] = [[0, 1]];
      storageSpy.getPods.and.returnValue(of(pods));

      effects.loadPods$.subscribe((action) => {
        const expected = PodsApiActions.loadPodsSuccess({ pods });
        expect(action).toEqual(expected);
        expect(storageSpy.getPods).toHaveBeenCalled();
        done();
      });
    });

    it('should return createDraftPods if none existed', (done: DoneFn) => {
      actions$ = of(PodsPageActions.enter());

      const pods: Pod[] = [];
      storageSpy.getPods.and.returnValue(of(pods));

      effects.loadPods$.subscribe((action) => {
        const expected = PodsApiActions.createDraftPods();
        expect(action).toEqual(expected);
        expect(storageSpy.getPods).toHaveBeenCalled();
        done();
      });
    });
  });
});
