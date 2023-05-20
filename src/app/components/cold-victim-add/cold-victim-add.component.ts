import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColdVictimService } from 'src/app/services/cold-victim.service';

@Component({
  selector: 'app-cold-victim-add',
  templateUrl: './cold-victim-add.component.html',
  styleUrls: ['./cold-victim-add.component.css']
})
export class ColdVictimAddComponent implements OnInit {
  coldVictimAddForm: FormGroup;
 
  constructor(public router: Router, private formBuilder: FormBuilder, private coldVictimService: ColdVictimService, private toastrService: ToastrService) { }
 
  ngOnInit(): void {
    this.createColdVictimAddForm();
  }

  createColdVictimAddForm() {
    this.coldVictimAddForm = this.formBuilder.group({
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
    if (this.coldVictimAddForm.valid) {
      let coldVictimModel = Object.assign({}, this.coldVictimAddForm.value);
      //console.log(coldVictimModel);
      this.coldVictimService.add(coldVictimModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/coldvictims');
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
