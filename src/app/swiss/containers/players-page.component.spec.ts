import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Player, PlayerService, RoundService, SharedModule } from '../../shared';
import { PlayersPageActions, PlayersApiActions } from '../actions';
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

  it('should dispatch an action to load players when created', () => {
    const action = new PlayersPageActions.LoadPlayers();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should have a list of players after loading data', () => {
    const players: Player[] = [{
      'id': '1',
      'name': 'Sten'
    }, {
      'id': '2',
      'name': 'Jasper'
    }];

    const action = new PlayersApiActions.LoadPlayersSuccess(players);

    store.dispatch(action);

    component.players$.subscribe(data => {
      expect(data.length).toBe(players.length);
    });
  });

  it('should dispatch an action to add a player when addPlayer called', () => {
    const player: Player = {
      'name': 'Sten'
    };

    const action = new PlayersPageActions.AddPlayer(player);

    component.addPlayer(player);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
