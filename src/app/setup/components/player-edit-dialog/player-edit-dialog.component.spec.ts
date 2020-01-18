import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Player } from '@app/shared/models';
import { PlayerEditDialogComponent } from './player-edit-dialog.component';

describe('PlayerEditDialogComponent', () => {
  let component: PlayerEditDialogComponent;
  let fixture: ComponentFixture<PlayerEditDialogComponent>;
  const player: Player = {
    id: 1,
    name: 'Sten',
    dropped: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {player}}
      ],
      declarations: [
        PlayerEditDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
