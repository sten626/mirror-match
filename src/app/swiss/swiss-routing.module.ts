import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PairingsPageComponent, PlayersPageComponent, SwissComponent } from './containers';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { StandingsGuard } from './standings-guard.service';
import { SwissStandingsComponent } from './swiss-standings.component';

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
    component: SwissStandingsComponent,
    canActivate: [StandingsGuard]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwissRoutingModule {}
