import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as fromRoot from '@app/reducers';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PodsGuard } from './pods.guard';

describe('PodsGuard', () => {
  let guard: PodsGuard;
  let mockIsDraftSelector: MemoizedSelector<fromRoot.State, boolean>;
  let routerSpy: jasmine.SpyObj<Router>;
  let store: MockStore;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }, provideMockStore()]
    });
    guard = TestBed.inject(PodsGuard);
    store = TestBed.inject(MockStore);
    mockIsDraftSelector = store.overrideSelector(fromRoot.getIsDraft, true);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should navigate home and return false when isDraft is false', (done: DoneFn) => {
      mockIsDraftSelector.setResult(false);
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    });

    it('should not call the router and return true when isDraft is true', (done: DoneFn) => {
      mockIsDraftSelector.setResult(true);
      guard.canActivate().subscribe((result) => {
        expect(result).toBe(true);
        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
