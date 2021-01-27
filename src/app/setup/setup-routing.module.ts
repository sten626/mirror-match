import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupPageComponent } from '@mm/setup/pages';

export const ROUTES: Routes = [
  {
    path: '',
    component: SetupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
