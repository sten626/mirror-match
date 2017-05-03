import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchResultsComponent } from './match-results.component';
import { PairingsGuard } from './pairings-guard.service';
import { PairingsListComponent } from './pairings-list.component';
import { SwissComponent } from './swiss.component';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissPlayerFormComponent } from './swiss-player-form.component';
import { SwissPlayerListComponent } from './swiss-player-list.component';
import { SwissPlayersComponent } from './swiss-players.component';
import { SwissPlayersStartComponent } from './swiss-players-start.component';
import { SwissStandingsComponent } from './swiss-standings.component';
import { SharedModule } from '../shared';

const routes: Routes = [{
  path: 'swiss',
  component: SwissComponent,
  children: [{
    path: '',
    redirectTo: '/swiss/players',
    pathMatch: 'full'
  }, {
    path: 'players',
    component: SwissPlayersComponent
  }, {
    path: 'pairings',
    component: SwissPairingsComponent,
    canActivate: [PairingsGuard]
  }, {
    path: 'standings',
    component: SwissStandingsComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    MatchResultsComponent,
    PairingsListComponent,
    SwissComponent,
    SwissPairingsComponent,
    SwissPlayerFormComponent,
    SwissPlayerListComponent,
    SwissPlayersComponent,
    SwissPlayersStartComponent,
    SwissStandingsComponent
  ],
  providers: [
    PairingsGuard
  ]
})
export class SwissModule { }
