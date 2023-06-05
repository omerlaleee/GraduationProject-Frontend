import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  constructor(private activatedRoute: ActivatedRoute, private toastrService: ToastrService) { }

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

  getPoints() {
    return [
      //  38.722024049007054
      // 35.48524017485906
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(38.722024049007054, 35.48524017485906),
      new google.maps.LatLng(37.782745, -122.444586),
      new google.maps.LatLng(37.782842, -122.443688),
      new google.maps.LatLng(37.782919, -122.442815),
      new google.maps.LatLng(37.782992, -122.442112),
      new google.maps.LatLng(37.7831, -122.441461),
      new google.maps.LatLng(37.783206, -122.440829),
      new google.maps.LatLng(37.783273, -122.440324),
      new google.maps.LatLng(37.783316, -122.440023),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783357, -122.439794),
      new google.maps.LatLng(37.783371, -122.439687)
    ];
  }

  onMapLoad(mapInstance: google.maps.Map) {
      this.map = mapInstance;
      const coords: google.maps.LatLng[] = this.getPoints();  
      this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: coords
    }
    );
  }

}
