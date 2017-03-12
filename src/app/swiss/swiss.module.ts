import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PairingsGuard } from './pairings-guard.service';
import { PairingsListComponent } from './pairings-list.component';
import { SwissComponent } from './swiss.component';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissPlayerFormComponent } from './swiss-player-form.component';
import { SwissPlayerListComponent } from './swiss-player-list.component';
import { SwissPlayersComponent } from './swiss-players.component';
import { SwissPlayersStartComponent } from './swiss-players-start.component';
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
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    PairingsListComponent,
    SwissComponent,
    SwissPairingsComponent,
    SwissPlayerFormComponent,
    SwissPlayerListComponent,
    SwissPlayersComponent,
    SwissPlayersStartComponent
  ],
  providers: [
    PairingsGuard
  ]
})
export class SwissModule { }
