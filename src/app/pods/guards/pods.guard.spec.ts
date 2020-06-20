import { TestBed } from '@angular/core/testing';

import { PodsGuard } from './pods.guard';

describe('PodsGuard', () => {
  let guard: PodsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PodsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
