import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims: OperationClaimModel[];
  dataLoaded = false;

  constructor(private operationClaimService: OperationClaimService, private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getClaims();
  }

  getClaims() {
    this.operationClaimService.getAll().subscribe(response => {
      this.claims = response.data;
      this.dataLoaded = true;
    });
  }

  delete(claim: OperationClaimModel) {
    this.operationClaimService.delete(claim).subscribe(
      response => {
        this.toastrService.success(response.message, "Rol Silindi!");
        this.getClaims();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi!");
      })
  }

}
