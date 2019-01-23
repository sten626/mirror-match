import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import {
  DbService,
  FooterComponent,
  HeaderComponent,
  MessageService,
  PairingService,
  PlayerService,
  RoundService,
  SharedModule,
  StandingsService
} from './shared';
import { reducers } from './swiss/reducers';
import { SwissModule } from './swiss/swiss.module';
import { PlayerEffects } from './swiss/effects/player.effects';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([PlayerEffects]),
    FormsModule,
    HomeModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.forRoot(reducers),
    SwissModule
  ],
  providers: [
    DbService,
    MessageService,
    PairingService,
    PlayerService,
    RoundService,
    StandingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
