import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  HeaderComponent,
  MessageService,
  PairingService,
  PairingStorageService,
  RoundStorageService,
  SharedModule,
  StandingsService,
  PlayerStorageService
} from './shared';
import { reducers } from './reducers';
import { environment } from '../environments/environment';

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
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    MessageService,
    PairingService,
    PairingStorageService,
    PlayerStorageService,
    RoundStorageService,
    StandingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
