import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { EmployeeViewComponent } from './employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeViewComponent,
    data: {
      title: 'List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeViewRoutingModule {}
