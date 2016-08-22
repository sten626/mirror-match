import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { PlayersComponent } from './players/players.component';
import { PlayerService } from './shared/player.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    PlayersComponent
  ],
  providers: [
    PlayerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
