import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  PairingStorageService,
  PlayerService,
  RoundService,
  RoundStorageService,
  SharedModule,
  StandingsService,
  PlayerStorageService
} from './shared';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([]),
    FormsModule,
    HomeModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    MessageService,
    PairingService,
    PairingStorageService,
    PlayerService,
    PlayerStorageService,
    RoundService,
    RoundStorageService,
    StandingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
