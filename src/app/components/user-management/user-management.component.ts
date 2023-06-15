import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  allUsers: User[] = [];
  dataLoaded: boolean = false;
  filterTextFirstname = "";
  filterTextLastname = "";
  userIsAdmin: boolean;
  allClaimsOfUser: OperationClaimModel[];

  email: string | any = window.localStorage.getItem("email")
  //userIsAdmin: boolean;
  claimsOfLoggedInUser: OperationClaimModel[];

  constructor(public authService: AuthService, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
    //console.log(this.allUsers);
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }

    if (this.email != null) {
      this.authService.getLoggedInUser(this.email);
      this.claimsOfLoggedInUser = this.authService.loggedInUser.claims;
    }
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
  }
  

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.allUsers = response.data;
      this.dataLoaded = true;
      //console.log(this.allUsers)
      //console.log(this.allUsers)
      this.allUsers.forEach(item => {
        this.userService.getClaimsOfUser(item.id).subscribe(response => {

          this.allClaimsOfUser = response.data;
          //console.log(typeof (response.data));
          item.claims = this.allClaimsOfUser;
        }, responseError => {
          //console.log(responseError);
          item.claims = responseError.error.data;
        })
      })
      //console.log(this.allUsers);
    })


    //console.log(this.allClaimsOfUser);
  }

  updateStatus(user: User) {
    if (user.status == false) {
      user.status = true;
    }
    else {
      user.status = false;
    }
    this.userService.update(user).subscribe(response => {
      this.getUsers();
    })
  }

  getCurrentButtonClass(user: User): string {
    if (user.status == false) {
      return "btn btn-success";
    }
    else {
      return "btn btn-danger";
    }
  }

  isAdmin(userId: number) {
    this.userService.isAdmin(userId).subscribe(response => {
      this.userIsAdmin = response.success;
    })
  }

  getClaimsOfUser(userId: number) {
    this.userService.getClaimsOfUser(userId).subscribe(response => {
      this.allClaimsOfUser = response.data;

    }, responseError => {
      this.allClaimsOfUser = [];
    })
  }
}
