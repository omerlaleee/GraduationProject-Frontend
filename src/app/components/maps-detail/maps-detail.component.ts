import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Victim } from 'src/app/models/victim';
import { VictimService } from 'src/app/services/victim.service';

@Component({
  selector: 'app-maps-detail',
  templateUrl: './maps-detail.component.html',
  styleUrls: ['./maps-detail.component.css']
})
export class MapsDetailComponent implements OnInit {

  zoom: number = 13;
  location = {
    lat: 37.57640781215303, lng: 36.9267962872982
  };

  constructor(private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private victimService: VictimService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let str: string = params["mapsAddress"];
      this.location.lat = Number(str.split("-")[0]);
      this.location.lng = Number(str.split("-")[1]);
    })
  }

  markerClick(event: any) {
    this.toastrService.info("Enlem : " + event.latitude + "\nBoylam : " + event.longitude)
    console.log(event);
  }
}
