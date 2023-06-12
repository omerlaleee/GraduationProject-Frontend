import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationClaimModel } from 'src/app/models/operationClaimModel';
import { OperationClaimService } from 'src/app/services/operation-claim.service';

@Component({
  selector: 'app-claim-assignment',
  templateUrl: './claim-assignment.component.html',
  styleUrls: ['./claim-assignment.component.css']
})
export class ClaimAssignmentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private operationClaimService: OperationClaimService) { }

  allClaims: OperationClaimModel[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getAllClaims(params["id"]);
      }
    })
  }

  getAllClaims(userId: number) {
    this.operationClaimService.getAll().subscribe(response => {
      this.allClaims = response.data;
    })
  }

}
