import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PlayersPageComponent,
  SetupPageComponent
} from '@app/setup/containers';

export const ROUTES: Routes = [
  {
    path: '',
    component: SetupPageComponent,
    children: [
      {
        path: '',
        component: PlayersPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
