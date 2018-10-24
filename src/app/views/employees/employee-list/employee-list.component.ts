import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs'

import { Employee } from "../employee.model";
import{ EmployeesService } from "../employees.service"

import { ActivatedRoute, ParamMap} from '@angular/router'
import{ AuthService } from "../../auth/auth.service"

@Component({
  templateUrl: 'employee-list.component.html'
})
export class EmployeeListComponent implements OnInit{

  constructor(
    public employeesService: EmployeesService,
    public route: ActivatedRoute,
  ) {}
  dismissible:boolean;
  message:string;
  public dangerModal;
  employees: Employee[] = [];
  private employeeSub: Subscription;
  private employeeSub1: Subscription;
  ngOnInit()
  {
    this.employeesService.getEmployees();
    this.employeeSub = this.employeesService.getEmployeeUpdateListner()
    .subscribe((employees: Employee[]) =>{
      this.employees=employees;
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('message')){
       this.dismissible = true; 
       if( paramMap.get('message') === "addSucess"){
         this.message = "Employee added sucesfully !!"
       }else if( paramMap.get('message') === "editSucess" ){
         this.message = "Employee edited sucesfully !!"
       }else{
         this.dismissible = false;
       }            
      } else {
       this.dismissible = false;
      }
    });
  }

  ngOnDestroy(){
    this.employeeSub.unsubscribe();
  }

  onDelete(employeeId: string){
    this.employeesService.deleteEmployee(employeeId);
  }
}
