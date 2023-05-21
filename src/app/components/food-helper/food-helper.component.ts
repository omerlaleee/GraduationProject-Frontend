import { Component } from '@angular/core';
import { FoodHelper } from 'src/app/models/foodHelper';
import { FoodHelperService } from 'src/app/services/food-helper.service';

@Component({
  selector: 'app-food-helper',
  templateUrl: './food-helper.component.html',
  styleUrls: ['./food-helper.component.css']
})
export class FoodHelperComponent {
  foodHelpers: FoodHelper[];
  dataLoaded = false;

  constructor(private foodHelperService:FoodHelperService){}

  ngOnInit(): void {
    this.getFoodHelpers();
  }

  getFoodHelpers(){
    this.foodHelperService.getFoodHelpers().subscribe(response=>{
      this.foodHelpers=response.data;
      this.dataLoaded=true;
    })
  }
}
