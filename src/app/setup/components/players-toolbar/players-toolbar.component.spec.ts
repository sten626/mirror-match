import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlayersToolbarComponent } from './players-toolbar.component';

describe('PlayersToolbarComponent', () => {
  let component: PlayersToolbarComponent;
  let fixture: ComponentFixture<PlayersToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersToolbarComponent],
      imports: [MatIconModule, MatToolbarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
