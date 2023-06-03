import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FoodHelper } from 'src/app/models/foodHelper';
import { User } from 'src/app/models/user';
import { Victim } from 'src/app/models/victim';
import { AuthService } from 'src/app/services/auth.service';
import { FoodHelperService } from 'src/app/services/food-helper.service';
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
  dataLoaded = false;

  constructor(private foodHelperService: FoodHelperService, private victimService: VictimService, public authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllVictims();
    this.getFoodHelpersByEmail();
  }
  //this.authService.loggedInUser.email
  email: string | any = window.localStorage.getItem("email")

  getAllVictims() {
    this.victimService.getAllVictims(this.email).subscribe(response => {
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

  // getHouseHelpers(){
  //   this.houseHelperService.getHouseHelpers().subscribe(response=>{
  //     this.houseHelpers=response.data;
  //     this.dataLoaded=true;
  //   })
  // }

  // getAllHelpers(){
  //   this.helperService.getAllHelpers(this.email).subscribe(response=>{
  //     this.helpers=response.data;
  //     this.dataLoaded = true;
  //   })
  // }

  delete(victim: Victim) {
    this.victimService.delete(victim).subscribe(
      response => {
        this.toastrService.success(response.message, "Başarılı");
        this.getAllVictims();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi");
      })
  }
}