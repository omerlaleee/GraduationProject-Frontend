import { Component } from '@angular/core';
import { HouseHelper } from 'src/app/models/houseHelper';
import { HouseHelperService } from 'src/app/services/house-helper.service';

@Component({
  selector: 'app-house-helper',
  templateUrl: './house-helper.component.html',
  styleUrls: ['./house-helper.component.css']
})
export class HouseHelperComponent {
  houseHelper: HouseHelper[];
  dataLoaded = false;

  constructor(private houseHelperService:HouseHelperService){}

  ngOnInit(): void {
    this.getHouseHelper();
  }

  getHouseHelper(){
    this.houseHelperService.getHouseHelpers().subscribe(response=>{
      this.houseHelper=response.data;
      this.dataLoaded=true;
    })
  }
}
