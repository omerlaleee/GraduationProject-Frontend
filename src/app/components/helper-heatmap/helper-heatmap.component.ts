import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodHelper } from 'src/app/models/foodHelper';
import { HouseHelper } from 'src/app/models/houseHelper';
import { TentHelper } from 'src/app/models/tentHelper';
import { Victim } from 'src/app/models/victim';
import { FoodHelperService } from 'src/app/services/food-helper.service';
import { HouseHelperService } from 'src/app/services/house-helper.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';
import { VictimService } from 'src/app/services/victim.service';

@Component({
  selector: 'app-helper-heatmap',
  templateUrl: './helper-heatmap.component.html',
  styleUrls: ['./helper-heatmap.component.css']
})
export class HelperHeatmapComponent implements OnInit {

  zoom: number = 6;
  location = {
    lat: 39, lng: 35.5
  };
  allHouseHelpers: HouseHelper[] = [];
  allFoodHelpers: FoodHelper[] = [];
  allTentHelpers: TentHelper[] = [];
  points: any | undefined = [];
  dataLoadForHouseHelper: boolean = false;
  dataLoadForFoodHelper: boolean = false;
  dataLoadForTentHelper: boolean = false;


  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  constructor(private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private houseHelperService: HouseHelperService,
    private foodHelperService: FoodHelperService,
    private tentHelperService: TentHelperService) { }

  ngOnInit(): void {
    this.getAllHouseHelpers();
    this.getAllFoodHelpers();
    this.getAllTentHelpers();
    this.activatedRoute.params.subscribe(params => {
      let str: string = params["mapsAddress"];
      this.location.lat = Number(str.split('-')[0]);
      this.location.lng = Number(str.split('-')[1]);
    })

  }

  getAllHouseHelpers() {
    this.houseHelperService.getHouseHelpers().subscribe(
      response => {
        this.allHouseHelpers = response.data;
        this.dataLoadForHouseHelper = true;
      }
    )
  }

  getAllFoodHelpers() {
    this.foodHelperService.getFoodHelpers().subscribe(
      response => {
        this.allFoodHelpers = response.data;
        this.dataLoadForFoodHelper = true;
      }
    )
  }

  getAllTentHelpers() {
    this.tentHelperService.getTentHelpers().subscribe(
      response => {
        this.allTentHelpers = response.data;
        this.dataLoadForTentHelper = true;
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
    this.allHouseHelpers.forEach(element => {
      element.type = "Barınma";
      let latcoord = Number(element.mapsAddress.split('-')[0]);
      let lngcoord = Number(element.mapsAddress.split('-')[1]);
      heatmapPoints.push(new google.maps.LatLng(latcoord, lngcoord));
      //console.log(element);
      let message = "Yardım Türü : " + element.type + "\n" + "Kişi Sayısı : " + element.numberOfPeople + "\n" + "Yardım Bilgisi : " + element.infoAboutHelp + "\n" + "Telefon No : " + element.phoneNumber;
      counter++;
      this.points.push({ lat: latcoord, lng: lngcoord, count: counter.toString(), message: message });
      //console.log(element);
    });
    this.allFoodHelpers.forEach(element => {
      element.type = "Yiyecek";
      let latcoord = Number(element.mapsAddress.split('-')[0]);
      let lngcoord = Number(element.mapsAddress.split('-')[1]);
      heatmapPoints.push(new google.maps.LatLng(latcoord, lngcoord));
      //console.log(element);
      let message = "Yardım Türü : " + element.type + "\n" + "Kişi Sayısı : " + element.numberOfPeople + "\n" + "Yardım Bilgisi : " + element.infoAboutHelp + "\n" + "Telefon No : " + element.phoneNumber;
      counter++;
      this.points.push({ lat: latcoord, lng: lngcoord, count: counter.toString(), message: message });
      //console.log(element);
    });
    this.allTentHelpers.forEach(element => {
      element.type = "Çadır";
      let latcoord = Number(element.mapsAddress.split('-')[0]);
      let lngcoord = Number(element.mapsAddress.split('-')[1]);
      heatmapPoints.push(new google.maps.LatLng(latcoord, lngcoord));
      //console.log(element);
      let message = "Yardım Türü : " + element.type + "\n" + "Kişi Sayısı : " + element.numberOfPeople + "\n" + "Yardım Bilgisi : " + element.infoAboutHelp + "\n" + "Telefon No : " + element.phoneNumber;
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
