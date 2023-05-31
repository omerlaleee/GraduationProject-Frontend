import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operator-helper-add',
  templateUrl: './operator-helper-add.component.html',
  styleUrls: ['./operator-helper-add.component.css']
})
export class OperatorHelperAddComponent implements OnInit {
  operatorHelperAddForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private operatorHelperService: OperatorHelperService
    , private toastrService: ToastrService, public router: Router) { }

    

  ngOnInit(): void {
    
    this.createOperatorHelperAddForm();
  }

  createOperatorHelperAddForm() {
    this.operatorHelperAddForm = this.formBuilder.group({
      address: ["", Validators.required],
      infoAboutHelp: ["", Validators.required]
    })
  }

  add() {
    if (this.operatorHelperAddForm.valid) {
      let operatorHelperModel = Object.assign({}, this.operatorHelperAddForm.value);
      operatorHelperModel.userId = this.authService.loggedInUser.id;
      //console.log(operatorHelperModel);
      this.operatorHelperService.add(operatorHelperModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/operatorhelpers');
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
