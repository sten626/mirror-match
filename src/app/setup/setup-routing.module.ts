import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddPlayersPageComponent,
  SetupPageComponent,
} from '@mm/setup/containers';

const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'players', component: AddPlayersPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
