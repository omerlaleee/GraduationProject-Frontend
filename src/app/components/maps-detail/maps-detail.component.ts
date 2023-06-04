import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let str: string = params["mapsAddress"];
      this.location.lat = Number(str.split("-")[0]);
      this.location.lng = Number(str.split("-")[1]);
    })
  }

  mapClick(event: any) {
    //console.log(event);
    this.location = event.coords;
    console.log(this.location);
  }

  mapDoubleClick(event: any) {
    //console.log(event);
  }

  markerClick(event: any) {
    //console.log(event);
  }

}
