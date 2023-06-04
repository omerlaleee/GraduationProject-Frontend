import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DebrisVictimService } from 'src/app/services/debris-victim.service';

@Component({
  selector: 'app-debris-victim-add',
  templateUrl: './debris-victim-add.component.html',
  styleUrls: ['./debris-victim-add.component.css']
})
export class DebrisVictimAddComponent {
  debrisVictimAddForm: FormGroup;
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
  constructor(public router: Router, private formBuilder: FormBuilder, private debrisVictimService: DebrisVictimService, private toastrService: ToastrService) { }
 
  ngOnInit(): void {
    this.createDebrisVictimAddForm();
  }

  createDebrisVictimAddForm() {
    this.debrisVictimAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      numberOfPeople: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      detailedAddress: ["", Validators.required],
      urgency: ["", Validators.required],
      statusInformation: ["", Validators.required]
    })
  }

  add() {
    if (this.debrisVictimAddForm.valid) {
      let debrisVictimModel = Object.assign({}, this.debrisVictimAddForm.value);
      debrisVictimModel.mapsAddress = this.location.lat + "-" + this.location.lng;
      console.log(debrisVictimModel);
      this.debrisVictimService.add(debrisVictimModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/debrisvictims');
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
      //console.log(this.debrisVictimAddForm.)
    }
  }
}
