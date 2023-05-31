import { Component } from '@angular/core';
import { TentHelper } from 'src/app/models/tentHelper';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';

@Component({
  selector: 'app-tent-helper',
  templateUrl: './tent-helper.component.html',
  styleUrls: ['./tent-helper.component.css']
})
export class TentHelperComponent {
  tentHelpers: TentHelper[];
  dataLoaded = false;
  filterText = "";

  constructor(private tentHelperService:TentHelperService){}

  ngOnInit(): void {
    this.getTentHelpers();
  }

  getTentHelpers(){
    this.tentHelperService.getTentHelpers().subscribe(response=>{
      this.tentHelpers=response.data;
      this.dataLoaded=true;
    })
  }
}
