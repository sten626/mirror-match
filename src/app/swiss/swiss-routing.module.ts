import { Routes, RouterModule } from '@angular/router';
import { PlayersPageComponent } from './containers/players-page.component';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { StandingsGuard } from './standings-guard.service';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissStandingsComponent } from './swiss-standings.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [{
  path: '',
  component: PlayersPageComponent
}, {
  path: 'event',
  component: EventInfoComponent,
  canActivate: [TournamentStartedGuard]
}, {
  path: 'pairings',
  component: SwissPairingsComponent,
  canActivate: [TournamentStartedGuard]
}, {
  path: 'standings',
  component: SwissStandingsComponent,
  canActivate: [StandingsGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwissRoutingModule {}
