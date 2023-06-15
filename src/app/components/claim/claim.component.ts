import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims: OperationClaimModel[];
  dataLoaded = false;

  email: string | any = window.localStorage.getItem("email")
  userIsAdmin: boolean;
  claimsOfLoggedInUser: OperationClaimModel[];

  constructor(public authService: AuthService, public userService: UserService,private operationClaimService: OperationClaimService, private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getClaims();


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

  getClaims() {
    this.operationClaimService.getAll().subscribe(response => {
      this.claims = response.data;
      this.dataLoaded = true;
    });
  }

  delete(claim: OperationClaimModel) {
    this.operationClaimService.delete(claim).subscribe(
      response => {
        this.toastrService.success(response.message, "Rol Silindi!");
        this.getClaims();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi!");
      })
  }

}
