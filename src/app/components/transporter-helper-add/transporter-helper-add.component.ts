import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TransporterHelperService } from 'src/app/services/transporter-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transporter-helper-add',
  templateUrl: './transporter-helper-add.component.html',
  styleUrls: ['./transporter-helper-add.component.css']
})
export class TransporterHelperAddComponent implements OnInit {
  transporterHelperAddForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private transporterHelperService: TransporterHelperService
    , private toastrService: ToastrService, public router: Router) { }


  ngOnInit(): void {
    this.createTransporterHelperAddForm();
  }

  createTransporterHelperAddForm() {
    this.transporterHelperAddForm = this.formBuilder.group({
      infoAboutHelp: ["", Validators.required],
      addressFrom: ["", Validators.required],
      addressTo: ["", Validators.required]
    })
  }

  add() {
    if (this.transporterHelperAddForm.valid) {
      let transporterHelperModel = Object.assign({}, this.transporterHelperAddForm.value);
      transporterHelperModel.userId = this.authService.loggedInUser.id;
      //console.log(transporterHelperModel);
      this.transporterHelperService.add(transporterHelperModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/transporterhelpers');
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
