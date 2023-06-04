import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-build-reporter-add',
  templateUrl: './build-reporter-add.component.html',
  styleUrls: ['./build-reporter-add.component.css']
})
export class BuildReporterAddComponent implements OnInit {

  buildReporterAddForm: FormGroup;
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

  constructor(private authService: AuthService, public router: Router, private formBuilder: FormBuilder, private buildReporterService: BuildReporterService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBuildReporterAddForm();
  }

  createBuildReporterAddForm() {
    this.buildReporterAddForm = this.formBuilder.group({
      address: ["", Validators.required],
      detailedAddress: ["", Validators.required],
      urgency: ["", Validators.required]
    })
  }

  add() {
    if (this.buildReporterAddForm.valid) {
      let buildReporterModel = Object.assign({}, this.buildReporterAddForm.value);
      buildReporterModel.userId = this.authService.loggedInUser.id;
      //console.log(this.location);
      buildReporterModel.mapsAddress = this.location.lat + "-" + this.location.lng;

      //console.log(buildReporterModel);
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
            console.log(responseError.error);
            this.toastrService.error(responseError.error, "Yetki Hatası");
            this.router.navigateByUrl('/login');
          }
        });
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }
}
