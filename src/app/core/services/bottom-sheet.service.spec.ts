import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { BottomSheetService } from './bottom-sheet.service';

describe('BottomSheetService', () => {
  let service: BottomSheetService;

  beforeEach(() => {
    const overlaySpy = jasmine.createSpyObj('Overlay', ['create']);
    TestBed.configureTestingModule({
      providers: [{ provide: Overlay, useValue: overlaySpy }]
    });
    service = TestBed.inject(BottomSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
