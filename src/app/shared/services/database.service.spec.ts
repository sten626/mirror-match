import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';

fdescribe('DatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
