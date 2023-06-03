import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BuildReporter } from 'src/app/models/buildReporter';
import { FoodHelper } from 'src/app/models/foodHelper';
import { HouseHelper } from 'src/app/models/houseHelper';
import { OperatorHelper } from 'src/app/models/operatorHelper';
import { TentHelper } from 'src/app/models/tentHelper';
import { TransporterHelper } from 'src/app/models/transporterHelper';
import { User } from 'src/app/models/user';
import { Victim } from 'src/app/models/victim';
import { AuthService } from 'src/app/services/auth.service';
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { FoodHelperService } from 'src/app/services/food-helper.service';
import { HouseHelperService } from 'src/app/services/house-helper.service';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';
import { TransporterHelperService } from 'src/app/services/transporter-helper.service';
import { UserService } from 'src/app/services/user.service';
import { VictimService } from 'src/app/services/victim.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  victims: Victim[];
  foodHelpers: FoodHelper[];
  transporterHelpers: TransporterHelper[];
  tentHelpers: TentHelper[];
  houseHelpers: HouseHelper[];
  operatorHelpers: OperatorHelper[];
  buildReporters: BuildReporter[];
  dataLoaded = false;

  constructor(private buildReporterService: BuildReporterService,
    private houseHelperService: HouseHelperService,
    private operatorHelperService: OperatorHelperService,
    private transporterHelperService: TransporterHelperService,
    private tentHelperService: TentHelperService,
    private foodHelperService: FoodHelperService,
    private victimService: VictimService,
    public authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllVictimsByEmail();
    this.getFoodHelpersByEmail();
    this.getHouseHelpersByEmail();
    this.getTentHelpersByEmail();
    this.getTransporterHelpersByEmail();
    this.getOperatorHelpersByEmail();
  }
  //this.authService.loggedInUser.email
  email: string | any = window.localStorage.getItem("email")

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

  deleteBuildReporters(buildReporters: BuildReporter) {
    this.buildReporterService.delete(buildReporters).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getOperatorHelpersByEmail();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }
}