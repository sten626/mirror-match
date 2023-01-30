import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EventInfoComponent,
  PairingsPageComponent,
  PlayersPageComponent,
  SwissComponent,
  StandingsPageComponent
} from '@mm/swiss/containers';
import { StandingsGuard, TournamentStartedGuard } from '@mm/swiss/guards';

export const routes: Routes = [{
  path: '',
  component: SwissComponent,
  children: [{
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  }, {
    path: 'event',
    component: EventInfoComponent,
    canActivate: [TournamentStartedGuard]
  }, {
    path: 'pairings',
    component: PairingsPageComponent,
    canActivate: [TournamentStartedGuard]
  }, {
    path: 'players',
    component: PlayersPageComponent
  }, {
    path: 'standings',
    component: StandingsPageComponent,
    canActivate: [StandingsGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwissRoutingModule {}
