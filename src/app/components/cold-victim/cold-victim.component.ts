import { Component, OnInit } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { ColdVictimService } from 'src/app/services/cold-victim.service';

@Component({
  selector: 'app-cold-victim',
  templateUrl: './cold-victim.component.html',
  styleUrls: ['./cold-victim.component.css']
})
export class ColdVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";

  constructor(private coldVictimService:ColdVictimService){}

  ngOnInit(): void {
    this.getColdVictims();
  }

  getColdVictims(){
    this.coldVictimService.getColdVictims().subscribe(response=>{
      this.victims=response.data;
      this.dataLoaded=true;
    })
  }

}
