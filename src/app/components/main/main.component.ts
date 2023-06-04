import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  lat = 37.57640781215303;
  lng = 36.9267962872982;
  zoom: number = 13;
  location = {
    lat: 37.57640781215303, lng: 36.9267962872982
  };

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
