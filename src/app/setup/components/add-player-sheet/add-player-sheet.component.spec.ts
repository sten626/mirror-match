import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddPlayerSheetComponent } from './add-player-sheet.component';

describe('AddPlayerSheetComponent', () => {
  let component: AddPlayerSheetComponent;
  let fixture: ComponentFixture<AddPlayerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayerSheetComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
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
