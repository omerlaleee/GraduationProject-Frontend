import { Component, OnInit } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { FoodVictimService } from 'src/app/services/food-victim.service';

@Component({
  selector: 'app-food-victim',
  templateUrl: './food-victim.component.html',
  styleUrls: ['./food-victim.component.css']
})
export class FoodVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";

  constructor(private foodVictimService:FoodVictimService){}

  ngOnInit(): void {
    this.getFoodVictims();
  }

  getFoodVictims(){
    this.foodVictimService.getFoodVictims().subscribe(response=>{
      this.victims=response.data;
      this.dataLoaded=true;
    })
  }
}
