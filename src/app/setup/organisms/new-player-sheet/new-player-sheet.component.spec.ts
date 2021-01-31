import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerSheetComponent } from './new-player-sheet.component';

describe('NewPlayerSheetComponent', () => {
  let component: NewPlayerSheetComponent;
  let fixture: ComponentFixture<NewPlayerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlayerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
