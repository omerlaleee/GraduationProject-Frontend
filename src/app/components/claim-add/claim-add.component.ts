import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-claim-add',
  templateUrl: './claim-add.component.html',
  styleUrls: ['./claim-add.component.css']
})
export class ClaimAddComponent implements OnInit {

  claimAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, public router: Router,
    private operationClaimService: OperationClaimService) { }


  ngOnInit(): void {
    this.createClaimAddForm();
  }

  createClaimAddForm() {
    this.claimAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  add() {
    if (this.claimAddForm.valid) {
      let operationClaimModel = Object.assign({}, this.claimAddForm.value);
      //console.log(transporterHelperModel);
      this.operationClaimService.add(operationClaimModel).subscribe(
        response => {
          // console.log(response.message);
          this.toastrService.success(response.message, "Başarılı");
          this.router.navigateByUrl('/claims');
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
