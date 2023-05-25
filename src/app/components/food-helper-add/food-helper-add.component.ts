import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { FoodHelperService } from 'src/app/services/food-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food-helper-add',
  templateUrl: './food-helper-add.component.html',
  styleUrls: ['./food-helper-add.component.css']
})
export class FoodHelperAddComponent implements OnInit {

  foodHelperAddForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private foodHelperService: FoodHelperService
    , private toastrService: ToastrService, public router: Router) { }

  loggedInUser: User;
  getLoggedInUser() {
    this.userService.getUserByEmail(window.localStorage.getItem("email")).subscribe(response => {
      this.loggedInUser = response.data;
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.createFoodHelperAddForm();
  }

  createFoodHelperAddForm() {
    this.foodHelperAddForm = this.formBuilder.group({
      infoAboutHelp: ["", Validators.required],
      numberOfPeople: ["", Validators.required],
      mapsAddress: ["", Validators.required]
    })
  }

  add() {
    if (this.foodHelperAddForm.valid) {
      let foodHelperModel = Object.assign({}, this.foodHelperAddForm.value);
      foodHelperModel.userId = this.loggedInUser.id;
      //console.log(foodHelperModel);
      this.foodHelperService.add(foodHelperModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/foodhelpers');
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