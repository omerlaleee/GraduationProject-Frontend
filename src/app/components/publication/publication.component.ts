import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BuildReporter } from 'src/app/models/buildReporter';
import { FoodHelper } from 'src/app/models/foodHelper';
import { HouseHelper } from 'src/app/models/houseHelper';
import { OperatorHelper } from 'src/app/models/operatorHelper';
import { TentHelper } from 'src/app/models/tentHelper';
import { TransporterHelper } from 'src/app/models/transporterHelper';
import { Victim } from 'src/app/models/victim';
import { AuthService } from 'src/app/services/auth.service';
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { FoodHelperService } from 'src/app/services/food-helper.service';
import { HouseHelperService } from 'src/app/services/house-helper.service';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';
import { TransporterHelperService } from 'src/app/services/transporter-helper.service';
import { VictimService } from 'src/app/services/victim.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  victims: Victim[] = [];
  foodHelpers: FoodHelper[] = [];
  transporterHelpers: TransporterHelper[] = [];
  tentHelpers: TentHelper[] = [];
  houseHelpers: HouseHelper[] = [];
  operatorHelpers: OperatorHelper[] = [];
  buildReporters: BuildReporter[] = [];
  dataLoaded = false;

  constructor(private buildReporterService: BuildReporterService,
    private houseHelperService: HouseHelperService,
    private operatorHelperService: OperatorHelperService,
    private transporterHelperService: TransporterHelperService,
    private tentHelperService: TentHelperService,
    private foodHelperService: FoodHelperService,
    private victimService: VictimService,
    public authService: AuthService, private toastrService: ToastrService) { }

  //this.authService.loggedInUser.email
  //window.localStorage.getItem("email")
  email: string | any = window.localStorage.getItem("email")

  ngOnInit(): void {
    if (this.email != null) {
      this.authService.getLoggedInUser(this.email);
    }
    this.getAllVictimsByEmail();
    this.getBuildReportersByEmail();
    this.getFoodHelpersByEmail();
    this.getHouseHelpersByEmail();
    this.getTentHelpersByEmail();
    this.getTransporterHelpersByEmail();
    this.getOperatorHelpersByEmail();
  }

  getAllVictimsByEmail() {
    this.victimService.getAllVictimsByEmail(this.email).subscribe(response => {
      this.victims = response.data;
      this.dataLoaded = true;
    })
  }

  getFoodHelpersByEmail() {
    this.foodHelperService.getFoodHelpersByEmail(this.email).subscribe(response => {
      this.foodHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  getHouseHelpersByEmail() {
    this.houseHelperService.getHouseHelpersByEmail(this.email).subscribe(response => {
      this.houseHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  getTentHelpersByEmail() {
    this.tentHelperService.getTentHelpersByEmail(this.email).subscribe(response => {
      this.tentHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  getTransporterHelpersByEmail() {
    this.transporterHelperService.getTransporterHelpersByEmail(this.email).subscribe(response => {
      this.transporterHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  getOperatorHelpersByEmail() {
    this.operatorHelperService.getOperatorHelpersByEmail(this.email).subscribe(response => {
      this.operatorHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  getBuildReportersByEmail() {
    this.buildReporterService.getBuildReportersByEmail(this.email).subscribe(response => {
      this.buildReporters = response.data;
      this.dataLoaded = true;
    });
  }



  deleteVictim(victim: Victim) {
    this.victimService.delete(victim).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getAllVictimsByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteFoodHelper(foodHelper: FoodHelper) {
    this.foodHelperService.delete(foodHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getFoodHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteHouseHelper(houseHelper: HouseHelper) {
    this.houseHelperService.delete(houseHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getHouseHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteTentHelper(tentHelper: TentHelper) {
    this.tentHelperService.delete(tentHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getTentHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteTransporterHelper(transporterHelper: TransporterHelper) {
    this.transporterHelperService.delete(transporterHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getTransporterHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteOperatorHelper(operatorHelper: OperatorHelper) {
    this.operatorHelperService.delete(operatorHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getOperatorHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }

  deleteBuildReporters(buildReporter: BuildReporter) {
    this.buildReporterService.delete(buildReporter).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getBuildReportersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }
}
