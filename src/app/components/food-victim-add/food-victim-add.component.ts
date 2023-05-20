import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodVictimService } from 'src/app/services/food-victim.service';

@Component({
  selector: 'app-food-victim-add',
  templateUrl: './food-victim-add.component.html',
  styleUrls: ['./food-victim-add.component.css']
})
export class FoodVictimAddComponent {
  foodVictimAddForm: FormGroup;
 
  constructor(public router: Router, private formBuilder: FormBuilder, private debrisVictimService: FoodVictimService, private toastrService: ToastrService) { }
 
  ngOnInit(): void {
    this.createFoodVictimAddForm();
  }

  createFoodVictimAddForm() {
    this.foodVictimAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      numberOfPeople: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      detailedAddress: ["", Validators.required],
      urgency: ["", Validators.required],
      statusInformation: ["", Validators.required],
      mapsAddress: ["", Validators.required]
    })
  }

  add() {
    if (this.foodVictimAddForm.valid) {
      let foodVictimModel = Object.assign({}, this.foodVictimAddForm.value);
      //console.log(coldVictimModel);
      this.debrisVictimService.add(foodVictimModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/foodvictims');
        },
        responseError => {
          //console.log(responseError.error.ValidationErrors);
          console.log(responseError.error);
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
            }
          }
        });
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }
}
