import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FoodHelperService } from 'src/app/services/food-helper.service';

@Component({
  selector: 'app-food-helper-add',
  templateUrl: './food-helper-add.component.html',
  styleUrls: ['./food-helper-add.component.css']
})
export class FoodHelperAddComponent implements OnInit {

  foodHelperAddForm: FormGroup;
  lat = 37.57640781215303;
  lng = 36.9267962872982;
  zoom: number = 13;
  location = {
    lat: 37.57640781215303, lng: 36.9267962872982
  };

  mapClick(event: any) {
    //console.log(event);
    this.location = event.coords;
    console.log(this.location);
  }

  mapDoubleClick(event: any) {
    //console.log(event);
  }

  markerClick(event: any) {
    //console.log(event);
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private foodHelperService: FoodHelperService
    , private toastrService: ToastrService, public router: Router) { }

  ngOnInit(): void {
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
      foodHelperModel.userId = this.authService.loggedInUser.id;
      //console.log(foodHelperModel);
      foodHelperModel.mapsAddress = this.location.lat + "-" + this.location.lng;
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
