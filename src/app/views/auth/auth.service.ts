import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { Router } from "@angular/router";
import { Subject} from 'rxjs'

import { environment } from "../../../environments/environment";
import { AuthData } from './auth.model'

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({providedIn:'root'})
export class AuthService{
  private token: string;
  private authStatusListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}
  
  getToken(){
    return this.token;
  }

  getAuthStatusListner(){ 
    return this.authStatusListner.asObservable();

  }
  
  createUser(name: string, email: string, password: string){
    const authData: AuthData = {name: name, email: email, password: password};
    this.http
    .post(BACKEND_URL+"signup",authData)
    .subscribe(responseData => {
        console.log(responseData);
      });
  }
  
  login(email: string, password: string){
    const authData: AuthData = {name: null, email: email, password: password};
    this.http
    .post<{token: string}>(BACKEND_URL+"login",authData)
    .subscribe(responseData => {
        const token = responseData.token;
        this.token = token;
        this.authStatusListner.next(true);
        this.router.navigate(["list"]);
      });
  }
  
}