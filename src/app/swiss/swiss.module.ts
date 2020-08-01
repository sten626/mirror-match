import { NgModule } from '@angular/core';
import { SharedModule } from '@mm/shared/shared.module';
import {
  MatchResultsComponent,
  PairingsListComponent,
  PairingsListFormComponent,
  PairingsMenuComponent,
  PlayerFormComponent,
  PlayerListComponent,
  PlayersInfoComponent,
  RoundInfoComponent,
  StandingsTableComponent,
  StartFormComponent,
  SwissMenuComponent
} from '@mm/swiss/components';
import { EventInfoComponent, PairingsPageComponent, PlayersPageComponent, StandingsPageComponent, SwissComponent } from '@mm/swiss/containers';
import { PairingEffects, RoundEffects, SwissEffects } from '@mm/swiss/effects';
import { StandingsGuard, TournamentStartedGuard } from '@mm/swiss/guards';
import * as fromSwiss from '@mm/swiss/reducers';
import { SwissRoutingModule } from '@mm/swiss/swiss-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    EffectsModule.forFeature([PairingEffects, RoundEffects, SwissEffects]),
    SharedModule,
    StoreModule.forFeature(fromSwiss.swissFeatureKey, fromSwiss.reducers),
    SwissRoutingModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
    PairingsListFormComponent,
    PairingsMenuComponent,
    PairingsPageComponent,
    PlayerFormComponent,
    PlayerListComponent,
    PlayersInfoComponent,
    PlayersPageComponent,
    RoundInfoComponent,
    StartFormComponent,
    SwissComponent,
    SwissMenuComponent,
    StandingsPageComponent,
    StandingsTableComponent
  ],
  providers: [
    StandingsGuard,
    TournamentStartedGuard
  ]
})
export class SwissModule { }
