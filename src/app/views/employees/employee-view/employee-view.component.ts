import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, ParamMap} from '@angular/router';

import { Employee } from "../employee.model";
import { Calculation, fedralmethod } from "../employee.calculation";
import{ EmployeesService } from "../employees.service";

@Component({
  templateUrl: 'employee-view.component.html',
  styleUrls: ["./employee-view.component.css"]
})
export class EmployeeViewComponent implements OnInit{

  constructor(public employeesService: EmployeesService, public route: ActivatedRoute) {}

  public dangerModal;
  private employeeID: string
  employee: Employee;
  calculation: Calculation;

  ngOnInit(){
  this.route.paramMap.subscribe((paramMap: ParamMap) =>{    
    this.employeeID = paramMap.get('employeeID');
    this.employeesService.getEmployee(this.employeeID)
    .subscribe(employeeData =>{
      this.employee = {
        id:employeeData._id,
      name: {
        first: employeeData.name.first,
        last: employeeData.name.last
      },
      phone: employeeData.phone,
      email: employeeData.email,
      age: employeeData.age,
      imagePath: employeeData.imagePath,
      baseSalary: employeeData.baseSalary,
      marital_status: employeeData.marital_status,
      fedral_allowances: employeeData.fedral_allowances,
      health_insurance: employeeData.health_insurance,
      vision_insurance: employeeData.vision_insurance,
      retirement_401k: employeeData.retirement_401k};
    },() =>{},() =>{this.doCalculation()});
  });
 }
 
  doCalculation(){      
    const grossPay = this.round((this.employee.baseSalary / 52) * 2);
    const perHour = this.round(this.employee.baseSalary / 2080);
    const ssn = this.round(grossPay * 0.062);
    const medicare = this.round(grossPay * 0.0145);
    const fica = ssn + medicare;
    const health = this.round((this.employee.health_insurance/100)*grossPay);
    const vision = this.round((this.employee.vision_insurance/100)*grossPay);
    const r401k = this.round((this.employee.retirement_401k/100)*grossPay);
    const preTax = health + vision + r401k; 
    const fedralTaxfinal = this.round(this.fedralCal(grossPay,preTax));
    const takeHomePay = this.round(grossPay - fica - preTax - fedralTaxfinal); 
    this.calculation= {
     grossSalary: grossPay,
     perHour: perHour,
     ssn:ssn,
     medicare:medicare,
     fica:fica,
     health:health,
     vision:vision,
     r401k:r401k,
     preTax:preTax,
     fedralTax:fedralTaxfinal,
     takeHomePay:takeHomePay 
    }; 
  }

  round(num){
    return Math.round(num * 100) / 100;
  }

  fedralCal(grossPay:number, preTax:number){
    let minimum_taxes,percentages,thresholds,fedraltax;
    const taxableWages = (grossPay - (this.employee.fedral_allowances * fedralmethod.allowances.biweekly) - preTax);
    const status:string = this.employee.marital_status;
    if(status === "Single"){
      minimum_taxes = fedralmethod.biweekly.Single.minimum_taxes;
      percentages = fedralmethod.biweekly.Single.percentages;
      thresholds = fedralmethod.biweekly.Single.thresholds;
      fedraltax = this.helper(minimum_taxes, percentages, thresholds, taxableWages);
    }else{
      minimum_taxes = fedralmethod.biweekly.Married.minimum_taxes;
      percentages = fedralmethod.biweekly.Married.percentages;
      thresholds = fedralmethod.biweekly.Married.thresholds;
      fedraltax = this.helper(minimum_taxes, percentages, thresholds, taxableWages);
    }
    return fedraltax;
   
  }

  helper(minimum_taxes:number[],percentages:number[],thresholds:number[], taxableWages:number){
    let index, fedralTax;
    for(let i = 0; i< thresholds.length; i++){
      if(taxableWages <= thresholds[i]){
          index = i;
          break;
      }
    }

    if(index == null){
      index = thresholds.length;
    }

    if(index === 0){
       fedralTax = 0;
    } else{
      let min_tax = minimum_taxes[index-1];
    let percentage = percentages[index-1];
    let threshold = thresholds[index-1];

    fedralTax =  min_tax + (percentage / 100.00) * (taxableWages - threshold);
    }
    return fedralTax;
  }
}
