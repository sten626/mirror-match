import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { SwissModule } from './swiss/swiss.module';
import {
  FooterComponent,
  HeaderComponent,
  PairingService,
  PlayerService,
  SharedModule
} from './shared';

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
    FormsModule,
    HomeModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SharedModule,
    SwissModule
  ],
  providers: [
    PairingService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
