import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@mm/app-routing.module';
import { AppComponent } from '@mm/app.component';
import { CoreModule } from '@mm/core/core.module';
import { PlayerEffects, TournamentEffects } from '@mm/core/effects';
import { ROOT_REDUCERS } from '@mm/reducers';
import { SharedModule } from '@mm/shared/shared.module';
import { TournamentModule } from '@mm/tournament';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    EffectsModule.forRoot([PlayerEffects, TournamentEffects]),
    FormsModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    TournamentModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
