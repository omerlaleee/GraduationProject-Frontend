import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Victim } from 'src/app/models/victim';
import { VictimService } from 'src/app/services/victim.service';

@Component({
  selector: 'app-victim-heatmap',
  templateUrl: './victim-heatmap.component.html',
  styleUrls: ['./victim-heatmap.component.css']
})
export class VictimHeatmapComponent implements OnInit {

  zoom: number = 6;
  location = {
    lat: 39, lng: 35.5
  };
  allVictims: Victim[] = [];
  points: any | undefined = [];
  dataLoad: boolean = false;


  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  constructor(private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private victimService: VictimService) { }

  ngOnInit(): void {
    this.getAllVictims();
    this.activatedRoute.params.subscribe(params => {
      let str: string = params["mapsAddress"];
      this.location.lat = Number(str.split('-')[0]);
      this.location.lng = Number(str.split('-')[1]);
    })

  }

  getAllVictims() {
    this.victimService.getAllVictims().subscribe(
      response => {
        this.allVictims = response.data;
        this.dataLoad = true;
      }
    )
  }

  markerClick(event: any) {
    this.toastrService.info("Enlem : " + event.latitude + "\nBoylam : " + event.longitude)
    //console.log(event);
  }

  getPoints() {
    //console.log(this.allVictims.data);
    let heatmapPoints: any = [];
    let counter = 0;
    this.allVictims.forEach(element => {
      let latcoord = Number(element.mapsAddress.split('-')[0]);
      let lngcoord = Number(element.mapsAddress.split('-')[1]);
      heatmapPoints.push(new google.maps.LatLng(latcoord, lngcoord));
      //console.log(element);
      let message = "İhtiyaç : " + element.victimType + "\n" + "Kişi Sayısı : " + element.numberOfPeople + "\n" + "Durum Bilgisi : " + element.statusInformation + "\n" + "Aciliyet : " + element.urgency + "\n" + "Telefon No : " + element.phoneNumber;
      counter++;
      this.points.push({ lat: latcoord, lng: lngcoord, count: counter.toString(), message: message });
      //console.log(element);
    });
    //console.log(heatmapPoints);
    return heatmapPoints;
  }

  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    const coords: google.maps.LatLng[] = this.getPoints();
    //console.log(this.points)
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: coords,
      radius: 18,
      dissipating: true,
      maxIntensity: 7,
      opacity: 0.7
    }
    );
  }
}
