import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  HeaderComponent,
  MessageService,
  PairingService,
  PlayerService,
  RoundService,
  SharedModule,
  StandingsService,
  PlayerStorageService,
  TournamentStorageService
} from './shared';
import { PlayerEffects } from './swiss/effects/player.effects';
import { TournamentEffects } from './swiss/effects/tournament.effects';
import { reducers } from './swiss/reducers';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([PlayerEffects, TournamentEffects]),
    FormsModule,
    HomeModule,
    HttpModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    MessageService,
    PairingService,
    PlayerService,
    PlayerStorageService,
    RoundService,
    StandingsService,
    TournamentStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
