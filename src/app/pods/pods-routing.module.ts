import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodsPageComponent } from '@app/pods/containers';

const routes: Routes = [{
  path: '',
  component: PodsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodsRoutingModule { }
