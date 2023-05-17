import { Component } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { FoodVictimService } from 'src/app/services/food-victim.service';

@Component({
  selector: 'app-food-victim',
  templateUrl: './food-victim.component.html',
  styleUrls: ['./food-victim.component.css']
})
export class FoodVictimComponent {
  victim: Victim[];
  dataLoaded = false;

  constructor(private foodVictimService:FoodVictimService){}

  ngOnInit(): void {
  }

  getFoodVictims(){
    this.foodVictimService.getFoodVictims().subscribe(response=>{
      this.victim=response.data;
      this.dataLoaded=true;
    })
  }
}
