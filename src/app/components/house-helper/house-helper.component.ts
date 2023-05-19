import { Component } from '@angular/core';
import { HouseHelper } from 'src/app/models/houseHelper';
import { HouseHelperService } from 'src/app/services/house-helper.service';

@Component({
  selector: 'app-house-helper',
  templateUrl: './house-helper.component.html',
  styleUrls: ['./house-helper.component.css']
})
export class HouseHelperComponent {
  houseHelpers: HouseHelper[];
  dataLoaded = false;

  constructor(private houseHelperService:HouseHelperService){}

  ngOnInit(): void {
    this.getHouseHelpers();
  }

  getHouseHelpers(){
    this.houseHelperService.getHouseHelpers().subscribe(response=>{
      this.houseHelpers=response.data;
      this.dataLoaded=true;
    })
  }
}
