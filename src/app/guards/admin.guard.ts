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


  // userIsAdmin: boolean = false;
  // flag: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // window.localStorage.getItem("isAdmin")

    if( window.localStorage.getItem("isAdmin")=="true"){
      return true;
    }
    else{
      this.router.navigate(["/"]);
      this.toastrService.info("Bu Sayfaya Erişim Hakkınız Yok!");
      return false;
    }

    // this.userService.isAdmin(this.authService.loggedInUser.id).subscribe(response => {
    //   this.userIsAdmin = response.success;
    //   if (this.userIsAdmin) {
    //     console.log(this.userIsAdmin);
    //     this.flag = true;
    //   }
    //   else {
    //     this.flag = false;
    //   }
    // })
    // //console.log(userIsAdmin);
    // if (!this.flag) {
    //   this.router.navigate(["/"]);
    //   this.toastrService.info("Bu Sayfaya Erişim Hakkınız Yok!");
    // }
    // return this.flag;

  }

}
