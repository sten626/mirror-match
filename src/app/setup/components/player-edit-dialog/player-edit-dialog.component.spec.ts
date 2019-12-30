import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditDialogComponent } from './player-edit-dialog.component';

describe('PlayerEditDialogComponent', () => {
  let component: PlayerEditDialogComponent;
  let fixture: ComponentFixture<PlayerEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerEditDialogComponent ]
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
