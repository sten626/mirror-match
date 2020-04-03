import { TestBed } from '@angular/core/testing';

import { PairingStorageService } from './pairing-storage.service';

describe('PairingStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PairingStorageService]
  }));

  it('should be created', () => {
    const service: PairingStorageService = TestBed.inject(PairingStorageService);
    expect(service).toBeTruthy();
  });
});
