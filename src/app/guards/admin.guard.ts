import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private toastrService: ToastrService, private router: Router) { }

  userIsAdmin: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isAdmin();
    //console.log(this.userIsAdmin);
    if (this.userIsAdmin == true) {
      return true;
    }
    else {
      this.router.navigate(["/"]);
      this.toastrService.info("Bu Sayfaya Erişim Hakkınız Yok!");
      return false;
    }
  }

  isAdmin() {
    this.userService.isAdmin(this.authService.loggedInUser.id).subscribe(response => {
      this.userIsAdmin = response.success;
    })
  }

}
