import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'add',
        loadChildren: './views/employees/employee-create/employee-create.module#EmployeeCreateModule'
      },
      {
        path: 'list',
        loadChildren: './views/employees/employee-list/employee-list.module#EmployeeListModule'
      },
      {
        path: 'list/:message',
        loadChildren: './views/employees/employee-list/employee-list.module#EmployeeListModule'
      },
      {
        path: 'edit/:employeeID',
        loadChildren: './views/employees/employee-create/employee-create.module#EmployeeCreateModule'
      },
      {
        path: 'view/:employeeID',
        loadChildren: './views/employees/employee-view/employee-view.module#EmployeeViewModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
