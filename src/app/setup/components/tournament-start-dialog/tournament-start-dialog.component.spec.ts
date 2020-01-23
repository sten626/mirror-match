import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentStartDialogComponent } from './tournament-start-dialog.component';

describe('TournamentStartDialogComponent', () => {
  let component: TournamentStartDialogComponent;
  let fixture: ComponentFixture<TournamentStartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentStartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentStartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
