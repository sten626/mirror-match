import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BOTTOM_SHEET_DATA } from '@mm/core/services/bottom-sheet-config';
import { BottomSheetRef } from '@mm/core/services/bottom-sheet-ref';
import { PlayerSheetComponent } from './player-sheet.component';

describe('PlayerSheetComponent', () => {
  let component: PlayerSheetComponent;
  let fixture: ComponentFixture<PlayerSheetComponent>;

  class BottomSheetRefStub {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BOTTOM_SHEET_DATA, useValue: {} },
        { provide: BottomSheetRef, useValue: BottomSheetRefStub }
      ],
      declarations: [PlayerSheetComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
