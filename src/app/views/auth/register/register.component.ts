import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

import{ AuthService } from "../auth.service" 

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(public authService: AuthService) { }

  onLogin(form: NgForm){
	if(form.invalid){
		return;
	}
	this.authService.createUser(form.value.username, form.value.email, form.value.password);
	}

}
