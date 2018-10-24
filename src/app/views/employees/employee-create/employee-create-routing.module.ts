import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './employee-create.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeCreateComponent,
    data: {
      title: 'Add'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeCreateRoutingModule {}
