import { TestBed } from '@angular/core/testing';

import { PodsStorageService } from './pods-storage.service';

describe('PodsStorageService', () => {
  let service: PodsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
