import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { PlayerService, RoundService, SharedModule } from '../../shared';
import * as fromPlayers from '../reducers';
import { PlayersPageComponent } from './players-page.component';

describe('Players Page Component', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let store: Store<fromPlayers.State>;

  @Component({selector: 'mm-player-form', template: ''})
  class PlayerFormStubComponent {}

  @Component({selector: 'mm-player-list', template: ''})
  class PlayerListStubComponent {}

  @Component({selector: 'mm-swiss-players-start', template: ''})
  class SwissPlayersStartStubComponent {}

  beforeEach(() => {
    const playerServiceStub: Partial<PlayerService> = {};
    const roundServiceStub: Partial<RoundService> = {};
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({
          ...fromPlayers.reducers
        })
      ],
      declarations: [
        PlayerFormStubComponent,
        PlayerListStubComponent,
        PlayersPageComponent,
        SwissPlayersStartStubComponent
      ],
      providers: [
        { provide: PlayerService, useValue: playerServiceStub },
        { provide: RoundService, useValue: roundServiceStub },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
