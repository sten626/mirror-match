import { TestBed } from '@angular/core/testing';

import { TournamentStorageService } from './tournament-storage.service';

describe('TournamentStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentStorageService = TestBed.get(TournamentStorageService);
    expect(service).toBeTruthy();
  });
});
