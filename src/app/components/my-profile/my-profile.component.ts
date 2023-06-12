import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  ngOnInit(): void {
    if (this.email != null) {
      this.authService.getLoggedInUser(this.email);
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