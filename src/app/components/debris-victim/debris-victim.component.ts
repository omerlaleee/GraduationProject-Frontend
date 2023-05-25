import { Component, OnInit } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { DebrisVictimService } from 'src/app/services/debris-victim.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-debris-victim',
  templateUrl: './debris-victim.component.html',
  styleUrls: ['./debris-victim.component.css']
})
export class DebrisVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";

  constructor(private debrisVictimService:DebrisVictimService){}

  ngOnInit(): void {
    this.getDeprisVictims();
  }

  getDeprisVictims(){
    this.debrisVictimService.getDebrisVictims().subscribe(response=>{
      this.victims=response.data;
      this.dataLoaded=true;
    })
  }
}
