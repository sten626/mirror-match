import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerSheetComponent } from './add-player-sheet.component';

describe('AddPlayerSheetComponent', () => {
  let component: AddPlayerSheetComponent;
  let fixture: ComponentFixture<AddPlayerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
