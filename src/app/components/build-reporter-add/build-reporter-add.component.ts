import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-build-reporter-add',
  templateUrl: './build-reporter-add.component.html',
  styleUrls: ['./build-reporter-add.component.css']
})
export class BuildReporterAddComponent implements OnInit {

  buildReporterAddForm: FormGroup;

  constructor(private userService: UserService, public router: Router, private formBuilder: FormBuilder, private buildReporterService: BuildReporterService, private toastrService: ToastrService) { }

  loggedInUser: User;
  getLoggedInUser() {
    this.userService.getUserByEmail(window.localStorage.getItem("email")).subscribe(response => {
      this.loggedInUser = response.data;
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.createBuildReporterAddForm();
  }

  createBuildReporterAddForm() {
    this.buildReporterAddForm = this.formBuilder.group({
      address: ["", Validators.required],
      detailedAddress: ["", Validators.required],
      urgency: ["", Validators.required],
      mapsAddress: ["", Validators.required]
    })
  }

  add() {
    if (this.buildReporterAddForm.valid) {
      let buildReporterModel = Object.assign({}, this.buildReporterAddForm.value);
      buildReporterModel.userId = this.loggedInUser.id;
      //console.log(buildReporterModel);
      this.buildReporterService.add(buildReporterModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/buildreporters');
        },
        responseError => {
          if (responseError.error.ValidationErrors) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
            }
          }
          else {
            this.toastrService.error("Sisteme Giriş Yapmalısınız!","Yetki Hatası");
            this.router.navigateByUrl('/login');
          }
        });
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }
}
