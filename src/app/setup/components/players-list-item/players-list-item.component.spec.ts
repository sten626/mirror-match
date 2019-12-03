import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersListItemComponent } from './players-list-item.component';

describe('PlayersListItemComponent', () => {
  let component: PlayersListItemComponent;
  let fixture: ComponentFixture<PlayersListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
