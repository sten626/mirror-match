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
  const numberOfDispatchesInInit = 2;
  let store: Store<fromPlayers.State>;
  let player1: Player;
  let player2: Player;

  @Component({selector: 'mm-player-form', template: ''})
  class PlayerFormStubComponent {}

  @Component({selector: 'mm-player-list', template: ''})
  class PlayerListStubComponent {}

  @Component({selector: 'mm-swiss-players-start', template: ''})
  class SwissPlayersStartStubComponent {}

  beforeEach(() => {
    player1 = {
      id: 1,
      name: 'Sten'
    };

    player2 = {
      id: 2,
      name: 'Jasper'
    };

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

  /* Creation */

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load players when created', () => {
    const action = new PlayersPageActions.LoadPlayers();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should have a list of players after loading data', () => {
    const players: Player[] = [player1, player2];

    const action = new PlayersApiActions.LoadPlayersSuccess(players);

    store.dispatch(action);

    component.players$.subscribe(data => {
      expect(data.length).toBe(players.length);
    });
  });

  /* addPlayer */

  it('should dispatch an action to add a player when addPlayer called', () => {
    const action = new PlayersPageActions.AddPlayer(player1);

    component.addPlayer(player1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  /* clearSelectedPlayer */

  it('should clear the selected player when clearSelectedPlayer called', () => {
    component.selectedPlayer = player1;

    expect(component.selectedPlayer).toBeDefined();

    component.clearSelectedPlayer();

    expect(component.selectedPlayer).toBeNull();
  });

  /* deletePlayer */

  describe('deletePlayer', () => {
    it('should dispatch an action to delete a player and clear same selected player', () => {
      component.selectedPlayer = player1;

      expect(component.selectedPlayer).toBeDefined();

      const action = new PlayersPageActions.DeletePlayer(player1);
      component.deletePlayer(player1);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(component.selectedPlayer).toBeNull();
    });

    it('should dispatch an action to delete a player and leave different selected player alone', () => {
      component.selectedPlayer = player1;

      expect(component.selectedPlayer).toEqual(player1);

      const action = new PlayersPageActions.DeletePlayer(player2);
      component.deletePlayer(player2);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(component.selectedPlayer).toEqual(player1);
    });
  });

  /* selectPlayer */

  describe('selectPlayer', () => {
    it('should set selectedPlayer when calling selectPlayer', () => {
      component.selectPlayer(player1);

      expect(component.selectedPlayer).toEqual(player1);
    });

    it('should set selectedPlayer to null', () => {
      component.selectPlayer(null);

      expect(component.selectedPlayer).toBeNull();
    });
  });

  /* updatePlayerName */

  describe('updatePlayerName', () => {
    it('should dispatch an action to update a player\'s name when called', () => {
      const newName = 'Steven';
      const action = new PlayersPageActions.UpdatePlayerName(player1, newName);
      component.updatePlayerName({ player: player1, name: newName });

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should not dispatch an action when called with no player', () => {
      component.updatePlayerName({player: null, name: 'Steven'});
      // Seems to start at 1 instead of 0.
      expect(store.dispatch).toHaveBeenCalledTimes(numberOfDispatchesInInit);
    });

    it('should not dispatch an action when called with no name', () => {
      component.updatePlayerName({player: player1, name: null});
      // Seems to start at 1 instead of 0.
      expect(store.dispatch).toHaveBeenCalledTimes(numberOfDispatchesInInit);
    });
  });
});
