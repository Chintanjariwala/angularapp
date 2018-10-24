import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { EmployeeViewComponent } from './employee-view.component';
import { EmployeeViewRoutingModule } from './employee-view-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    EmployeeViewRoutingModule,
    TabsModule,
    ModalModule.forRoot(),
    CommonModule
  ],
  declarations: [ EmployeeViewComponent ]
})
export class EmployeeViewModule { }
