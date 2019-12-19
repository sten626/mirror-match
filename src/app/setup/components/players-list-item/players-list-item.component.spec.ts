import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { PlayersListItemComponent } from './players-list-item.component';

describe('PlayersListItemComponent', () => {
  let component: PlayersListItemComponent;
  let fixture: ComponentFixture<PlayersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PlayersListItemComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListItemComponent);
    component = fixture.componentInstance;
    component.player = {
      id: null,
      name: 'Sten',
      dropped: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
