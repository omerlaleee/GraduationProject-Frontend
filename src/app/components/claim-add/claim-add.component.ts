import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-claim-add',
  templateUrl: './claim-add.component.html',
  styleUrls: ['./claim-add.component.css']
})
export class ClaimAddComponent implements OnInit {

  claimAddForm: FormGroup;

  email: string | any = window.localStorage.getItem("email")
  userIsAdmin: boolean;
  claimsOfLoggedInUser: OperationClaimModel[];

  constructor(public authService: AuthService, public userService: UserService,private formBuilder: FormBuilder, private toastrService: ToastrService, public router: Router,
    private operationClaimService: OperationClaimService) { }


  ngOnInit(): void {
    this.createClaimAddForm();


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

  createClaimAddForm() {
    this.claimAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  add() {
    if (this.claimAddForm.valid) {
      let operationClaimModel = Object.assign({}, this.claimAddForm.value);
      //console.log(transporterHelperModel);
      this.operationClaimService.add(operationClaimModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/claims');
        },
        responseError => {
          if (responseError.error.ValidationErrors) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
            }
          }
          else {
            this.toastrService.error("Sisteme Giriş Yapmalısınız!", "Yetki Hatası");
            this.router.navigateByUrl('/login');
          }
        });
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }

}
