import { Component, OnInit } from '@angular/core';
import { OperatorHelper } from 'src/app/models/operatorHelper';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';

@Component({
  selector: 'app-operator-helper',
  templateUrl: './operator-helper.component.html',
  styleUrls: ['./operator-helper.component.css']
})
export class OperatorHelperComponent implements OnInit {
  operatorHelpers: OperatorHelper[];
  dataLoaded = false;

  constructor(private operatorHelperService:OperatorHelperService){}

  ngOnInit(): void {
    this.getOperatorHelpers();
  }

  getOperatorHelpers(){
    this.operatorHelperService.getOperatorHelpers().subscribe(response=>{
      this.operatorHelpers=response.data;
      this.dataLoaded=true;
    })
  }
}
