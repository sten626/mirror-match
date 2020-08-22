import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetContainerComponent } from './bottom-sheet-container.component';

describe('BottomSheetContainerComponent', () => {
  let component: BottomSheetContainerComponent;
  let fixture: ComponentFixture<BottomSheetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
