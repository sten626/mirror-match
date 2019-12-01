import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { HomeModule } from 'app/home/home.module';
import { rootReducers } from 'app/reducers';
import { environment } from '../environments/environment';
import {
  PairingService,
  PairingStorageService,
  PlayerStorageService,
  RoundStorageService,
  SharedModule
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    EffectsModule.forRoot([]),
    FormsModule,
    HomeModule,
    SharedModule,
    StoreModule.forRoot(rootReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    PairingService,
    PairingStorageService,
    PlayerStorageService,
    RoundStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
