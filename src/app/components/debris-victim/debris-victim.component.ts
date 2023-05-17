import { Component } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { DebrisVictimService } from 'src/app/services/debris-victim.service';

@Component({
  selector: 'app-debris-victim',
  templateUrl: './debris-victim.component.html',
  styleUrls: ['./debris-victim.component.css']
})
export class DebrisVictimComponent {
  victim: Victim[];
  dataLoaded = false;

  constructor(private debrisVictimService:DebrisVictimService){}

  ngOnInit(): void {
  }

  getDeprisVictims(){
    this.debrisVictimService.getDebrisVictims().subscribe(response=>{
      this.victim=response.data;
      this.dataLoaded=true;
    })
  }
}
