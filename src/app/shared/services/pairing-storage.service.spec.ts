import { TestBed } from '@angular/core/testing';

import { PairingStorageService } from './pairing-storage.service';

describe('PairingStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PairingStorageService = TestBed.get(PairingStorageService);
    expect(service).toBeTruthy();
  });
});
