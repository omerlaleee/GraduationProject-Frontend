import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { repeat } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private toastrService: ToastrService, public authService: AuthService, private router: Router, public userService: UserService) { }

  email = window.localStorage.getItem("email");
  ngOnInit(): void {
    if (this.email != null) {
      this.authService.getLoggedInUser(this.email);
    }
  }

  logout() {
    this.authService.logout();
    this.toastrService.info("Hesaptan çıkış yapıldı.");
    this.router.navigate(["/"]);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated(window.localStorage.getItem("token"));
  }

}
