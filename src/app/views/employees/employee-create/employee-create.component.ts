import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router'

import { Employee } from "../employee.model";
import{ EmployeesService } from "../employees.service"
import { CustomValidator } from "../validation"


@Component({
  selector: 'employee-create-root',
  templateUrl: 'employee-create.component.html',
  styleUrls: ["./employee-create.component.css"]
})
export class EmployeeCreateComponent implements OnInit {

   employee: Employee;
   registerForm: FormGroup;
   submitted = false;
   imagePrivew: string;
   private mode = 'create';
   private employeeID: string;
   imagePreview: string;
   

  constructor(
    public employeesService: EmployeesService, 
    public route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.createForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      if(paramMap.has('employeeID')){
        this.mode = 'edit';
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
          retirement_401k: employeeData.retirement_401k
        };
        this.registerForm.setValue({
          fname: this.employee.name.first,
          lname: this.employee.name.last,
          phone: this.employee.phone,
          email: this.employee.email,
          age: this.employee.age,
          baseSalary: this.employee.baseSalary,
          marital_status: this.employee.marital_status,
          fedral_allowances: this.employee.fedral_allowances,
          health_insurance: this.employee.health_insurance,
          vision_insurance: this.employee.vision_insurance,
          retirement_401k: this.employee.retirement_401k
        });
        });
      } else {
        this.mode = 'create';
        this.employeeID = null;
      }
    });
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            phone: ['', [Validators.required, CustomValidator.phoneValidator]] ,
            email: ['', [Validators.required, Validators.email]],
            age: ['', Validators.required],
            image: ['',Validators.required],
            baseSalary: ['', [Validators.required, Validators.minLength(2)]],
            marital_status: ['', Validators.required],
            fedral_allowances: ['', Validators.required],
            health_insurance: ['', Validators.required],
            vision_insurance: ['', Validators.required],
            retirement_401k: ['', Validators.required]
        });
  }

  get f() { return this.registerForm.controls; }


  onSaveEmployee(){

    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    if(this.mode === "create"){
      const employee: Employee = {
      id:null,
      name: {
        first: this.registerForm.value.fname,
        last: this.registerForm.value.lname
      },
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      age: this.registerForm.value.age,
      imagePath: this.registerForm.value.lname,
      baseSalary: this.registerForm.value.baseSalary,
      marital_status: this.registerForm.value.marital_status,
      fedral_allowances: this.registerForm.value.fedral_allowances,
      health_insurance: this.registerForm.value.health_insurance,
      vision_insurance: this.registerForm.value.vision_insurance,
      retirement_401k: this.registerForm.value.retirement_401k
    }

    this.employeesService.addEmployee(employee);
  } else {
    const employee: Employee = {
      id:this.employeeID,
      name: {
        first: this.registerForm.value.fname,
        last: this.registerForm.value.lname
      },
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      age: this.registerForm.value.age,
      imagePath: this.registerForm.value.lname,
      baseSalary: this.registerForm.value.baseSalary,
      marital_status: this.registerForm.value.marital_status,
      fedral_allowances: this.registerForm.value.fedral_allowances,
      health_insurance: this.registerForm.value.health_insurance,
      vision_insurance: this.registerForm.value.vision_insurance,
      retirement_401k: this.registerForm.value.retirement_401k
    }
    this.employeesService.updateEmployee(this.employeeID, employee);
  }    
  }

}


