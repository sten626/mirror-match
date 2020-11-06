import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListItemComponent } from './player-list-item.component';

describe('PlayerListItemComponent', () => {
  let component: PlayerListItemComponent;
  let fixture: ComponentFixture<PlayerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
