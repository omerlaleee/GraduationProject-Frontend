import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { HouseHelperService } from 'src/app/services/house-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-house-helper-add',
  templateUrl: './house-helper-add.component.html',
  styleUrls: ['./house-helper-add.component.css']
})
export class HouseHelperAddComponent implements OnInit {

  houseHelperAddForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private houseHelperService: HouseHelperService
    , private toastrService: ToastrService, public router: Router) { }

  loggedInUser: User;
  getLoggedInUser() {
    this.userService.getUserByEmail(window.localStorage.getItem("email")).subscribe(response => {
      this.loggedInUser = response.data;
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.createHouseHelperAddForm();
  }

  createHouseHelperAddForm() {
    this.houseHelperAddForm = this.formBuilder.group({
      infoAboutHelp: ["", Validators.required],
      numberOfPeople: ["", Validators.required],
      mapsAddress: ["", Validators.required]
    })
  }

  add() {
    if (this.houseHelperAddForm.valid) {
      let houseHelperModel = Object.assign({}, this.houseHelperAddForm.value);
      houseHelperModel.userId = this.loggedInUser.id;
      //console.log(houseHelperModel);
      this.houseHelperService.add(houseHelperModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/househelpers');
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
