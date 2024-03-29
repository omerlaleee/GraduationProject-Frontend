import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  
  constructor(public authService: AuthService, public userService: UserService, private toastrService: ToastrService) { }

  //this.authService.loggedInUser.email
  //window.localStorage.getItem("email")
  email: string | any = window.localStorage.getItem("email")
  userIsAdmin: boolean;
  claimsOfLoggedInUser: OperationClaimModel[];
  
  public menuItems: any[];
  
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.authService.getLoggedInUser(this.email);
    if (this.email != null) {
      this.authService.getLoggedInUser(this.email);
      this.claimsOfLoggedInUser = this.authService.loggedInUser.claims;
    }
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
  }

  isAdmin(userId: number) {
    this.userService.isAdmin(userId).subscribe(response => {
      this.userIsAdmin = response.success;
    })
  }
}

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
  { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];