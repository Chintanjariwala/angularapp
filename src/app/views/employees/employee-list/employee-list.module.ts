import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    EmployeeListRoutingModule,
    ModalModule.forRoot(),
    CommonModule,
    AlertModule.forRoot()
  ],
  declarations: [ EmployeeListComponent ]
})
export class EmployeeListModule { }
