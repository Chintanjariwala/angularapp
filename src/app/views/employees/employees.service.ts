import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Subject} from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
import { Employee } from './employee.model'

const BACKEND_URL = environment.apiUrl + "/employee/";

@Injectable({providedIn:'root'})
export class EmployeesService{
  private employees: Employee[]=[];
  private employessUpdate = new Subject<Employee[]>();
  msg:string;

  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(){
    this.http
    .get<{ post: any }>(BACKEND_URL)
    .pipe(map((employeeData) =>{
      return employeeData.post.map(employee =>{
        return{
          id:employee._id,
          name: {
            first: employee.name.first,
            last: employee.name.last
          },
          phone: employee.phone,
          email: employee.email,
          age: employee.age,
          imagePath: employee.imagePath,
          baseSalary: employee.baseSalary,
          marital_status: employee.marital_status,
          fedral_allowances: employee.fedral_allowances,
          health_insurance: employee.health_insurance,
          vision_insurance: employee.vision_insurance,
          retirement_401k: employee.retirement_401k
        };
      });
    }))
    .subscribe(response =>{
       this.employees=response;
      this.employessUpdate.next([...this.employees]);
    });
  }

  getEmployeeUpdateListner(){
    return this.employessUpdate.asObservable();
  }

  getEmployee(id: string){
    return this.http
    .get<{_id:string,
  name: {
    first: string,
    last: string
  },
  phone: number,
  email: string,
  age: number,
  imagePath: string,
  baseSalary: number,
  marital_status: string,
  fedral_allowances: number,
  health_insurance: number,
  vision_insurance: number,
  retirement_401k: number}>(BACKEND_URL+id);
  }

  addEmployee(employee: Employee){
     const newEmployee: Employee = {
      id:employee.id,
      name: {
        first: employee.name.first,
        last: employee.name.last
      },
      phone: employee.phone,
      email: employee.email,
      age: employee.age,
      imagePath: employee.imagePath,
      baseSalary: employee.baseSalary,
      marital_status: employee.marital_status,
      fedral_allowances: employee.fedral_allowances,
      health_insurance: employee.health_insurance,
      vision_insurance: employee.vision_insurance,
      retirement_401k: employee.retirement_401k
    };
    this.http
    .post<{ message: string; employee: Employee }>(BACKEND_URL,newEmployee)
    .subscribe(responseData => {
        this.router.navigate(["list/addSucess"]);
      });

  }

  updateEmployee(id: string, employee: Employee ){
    const upEmployee: Employee = {
      id:employee.id,
      name: {
        first: employee.name.first,
        last: employee.name.last
      },
      phone: employee.phone,
      email: employee.email,
      age: employee.age,
      imagePath: employee.imagePath,
      baseSalary: employee.baseSalary,
      marital_status: employee.marital_status,
      fedral_allowances: employee.fedral_allowances,
      health_insurance: employee.health_insurance,
      vision_insurance: employee.vision_insurance,
      retirement_401k: employee.retirement_401k
    };
    this.http
    .put(BACKEND_URL+id,upEmployee)
    .subscribe(response =>{
      const updatedEmployee = [...this.employees];
      const oldEmployeeIndex = updatedEmployee.findIndex(p => p.id === upEmployee.id);
      updatedEmployee[oldEmployeeIndex] = upEmployee;
      this.employees = updatedEmployee;
      this.employessUpdate.next([...this.employees]);
      this.router.navigate(["list/editSucess"]);
    });
  }

  deleteEmployee(employeeId: string){
    this.http.delete(BACKEND_URL+employeeId)
    .subscribe(() =>{
      const updateEmployees = this.employees.filter(employee => employee.id !== employeeId);
      this.employees = updateEmployees;  
      this.employessUpdate.next([...this.employees]);
    })
  }
}