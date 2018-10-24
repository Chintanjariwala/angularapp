import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { navItems } from './../../_nav';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs'
import { Injectable } from '@angular/core';

import{ AuthService } from "../../views/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
@Injectable()
export class DefaultLayoutComponent implements OnInit{
  userIsAuthenticated = false;
  private employeeSub1: Subscription;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(public employeesService1: AuthService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }


  ngOnInit(){
  this.employeeSub1 = this.employeesService1.getAuthStatusListner()
    .subscribe((a) =>{
    })
  }

  ngOnDestroy(){
    this.employeeSub1.unsubscribe();
  }
}
