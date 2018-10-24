import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EmployeeCreateComponent } from './employee-create.component';
import { EmployeeCreateRoutingModule } from './employee-create-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EmployeeCreateRoutingModule,
    CommonModule
  ],
  declarations: [ EmployeeCreateComponent]
})
export class EmployeeCreateModule { }
