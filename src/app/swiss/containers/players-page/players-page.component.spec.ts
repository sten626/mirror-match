import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { SharedModule } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { PlayersPageComponent } from './players-page.component';

describe('Players Page Component', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let store: Store<fromSwiss.State>;
  // let player1: Player;
  // let player2: Player;

  @Component({selector: 'mm-player-form', template: ''})
  class PlayerFormStubComponent {}

  @Component({selector: 'mm-player-list', template: ''})
  class PlayerListStubComponent {}

  @Component({selector: 'mm-start-form', template: ''})
  class StartFormStubComponent {}

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromSwiss.reducers)
        })
      ],
      declarations: [
        PlayerFormStubComponent,
        PlayerListStubComponent,
        PlayersPageComponent,
        StartFormStubComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    // player1 = {
    //   id: 1,
    //   name: 'Sten',
    //   dropped: false
    // };

    // player2 = {
    //   id: 2,
    //   name: 'Jasper',
    //   dropped: false
    // };

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

  // it('should dispatch an action to load players when created', () => {
  //   const action = new PlayersPageActions.LoadPlayers();

  //   expect(store.dispatch).toHaveBeenCalledWith(action);
  // });

  // it('should have a list of players after loading data', () => {
  //   const players: Player[] = [player1, player2];

  //   store.dispatch(PlayersApiActions.loadPlayersSuccess({players}));

  //   component.players$.subscribe(data => {
  //     expect(data.length).toBe(players.length);
  //   });
  // });

  /* addPlayer */

  // it('should dispatch an action to add a player when addPlayer called', () => {
  //   const action = new PlayersPageActions.AddPlayer(player1);

  //   component.addPlayer(player1);
  //   expect(store.dispatch).toHaveBeenCalledWith(action);
  // });

  /* clearSelectedPlayer */

  // it('should clear the selected player when clearSelectedPlayer called', () => {
  //   component.selectedPlayer = player1;

  //   expect(component.selectedPlayer).toBeDefined();

  //   component.clearSelectedPlayer();

  //   expect(component.selectedPlayer).toBeNull();
  // });

  /* deletePlayer */

  // describe('deletePlayer', () => {
  //   it('should dispatch an action to delete a player and clear same selected player', () => {
  //     component.selectedPlayer = player1;

  //     expect(component.selectedPlayer).toBeDefined();

  //     const playerId = player1.id;
  //     const action = PlayersPageActions.deletePlayer({playerId});
  //     component.deletePlayer(playerId);

  //     expect(store.dispatch).toHaveBeenCalledWith(action);
  //     expect(component.selectedPlayer).toBeNull();
  //   });

  //   it('should dispatch an action to delete a player and leave different selected player alone', () => {
  //     component.selectedPlayer = player1;

  //     expect(component.selectedPlayer).toEqual(player1);

  //     const playerId = player2.id;
  //     const action = PlayersPageActions.deletePlayer({playerId});
  //     component.deletePlayer(playerId);

  //     expect(store.dispatch).toHaveBeenCalledWith(action);
  //     expect(component.selectedPlayer).toEqual(player1);
  //   });
  // });

  /* selectPlayer */

  // describe('selectPlayer', () => {
  //   it('should set selectedPlayer when calling selectPlayer', () => {
  //     component.selectPlayer(player1);

  //     expect(component.selectedPlayer).toEqual(player1);
  //   });

  //   it('should set selectedPlayer to null', () => {
  //     component.selectPlayer(null);

  //     expect(component.selectedPlayer).toBeNull();
  //   });
  // });

  /* updatePlayerName */

  // describe('updatePlayerName', () => {
  //   it('should dispatch an action to update a player\'s name when called', () => {
  //     const newName = 'Steven';
  //     const action = PlayersPageActions.updatePlayerName({
  //       player: player1,
  //       name: newName
  //     });
  //     component.updatePlayerName({ player: player1, name: newName });

  //     expect(store.dispatch).toHaveBeenCalledWith(action);
  //   });

  //   it('should not dispatch an action when called with no player', () => {
  //     component.updatePlayerName({player: null, name: 'Steven'});
  //     expect(store.dispatch).toHaveBeenCalledTimes(0);
  //   });

  //   it('should not dispatch an action when called with no name', () => {
  //     component.updatePlayerName({player: player1, name: null});
  //     expect(store.dispatch).toHaveBeenCalledTimes(0);
  //   });
  // });
});
