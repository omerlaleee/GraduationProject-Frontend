import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-reporter-add',
  templateUrl: './build-reporter-add.component.html',
  styleUrls: ['./build-reporter-add.component.css']
})
export class BuildReporterAddComponent implements OnInit {

  buildReporterAddForm: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder, private buildReporterService: BuildReporterService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBuildReporterAddForm();
  }

  createBuildReporterAddForm() {
    this.buildReporterAddForm = this.formBuilder.group({
      userId: ["", Validators.required],
      address: ["", Validators.required],
      detailedAddress: ["", Validators.required],
      urgency: ["", Validators.required],
      mapsAddress: ["", Validators.required]
    })
  }

  add() {
    if (this.buildReporterAddForm.valid) {
      let buildReporterModel = Object.assign({}, this.buildReporterAddForm.value);
      //console.log(buildReporterModel);
      this.buildReporterService.add(buildReporterModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/buildreporters');
        },
        responseError => {
          console.log(responseError.error.ValidationErrors);
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
