import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EventInfoComponent,
  PairingsPageComponent,
  PlayersPageComponent,
  SwissComponent,
  StandingsPageComponent
} from 'app/swiss/containers';
import { TournamentStartedGuard } from 'app/swiss/guards/tournament-started-guard.service';
import { StandingsGuard } from 'app/swiss/standings-guard.service';

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
