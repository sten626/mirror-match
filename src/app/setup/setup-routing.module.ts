import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddPlayerComponent,
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
        component: PlayersPageComponent,
        data: { animation: 'PlayersPage' }
      },
      {
        path: 'add',
        component: AddPlayerComponent,
        data: { animation: 'AddPlayer' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
