import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tent-helper-add',
  templateUrl: './tent-helper-add.component.html',
  styleUrls: ['./tent-helper-add.component.css']
})
export class TentHelperAddComponent implements OnInit {
  tentHelperAddForm: FormGroup;
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


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tentHelperService: TentHelperService
    , private toastrService: ToastrService, public router: Router) { }


  ngOnInit(): void {
    this.createTentHelperAddForm();
  }

  createTentHelperAddForm() {
    this.tentHelperAddForm = this.formBuilder.group({
      infoAboutHelp: ["", Validators.required],
      numberOfPeople: ["", Validators.required]
    })
  }

  add() {
    if (this.tentHelperAddForm.valid) {
      let tentHelperModel = Object.assign({}, this.tentHelperAddForm.value);
      tentHelperModel.userId = this.authService.loggedInUser.id;
      tentHelperModel.mapsAddress = this.location.lat + "-" + this.location.lng;
      //console.log(tentHelperModel);
      this.tentHelperService.add(tentHelperModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/tenthelpers');
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
