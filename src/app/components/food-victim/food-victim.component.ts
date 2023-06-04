import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Victim } from 'src/app/models/victim';
import { AuthService } from 'src/app/services/auth.service';
import { FoodVictimService } from 'src/app/services/food-victim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food-victim',
  templateUrl: './food-victim.component.html',
  styleUrls: ['./food-victim.component.css']
})
export class FoodVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private foodVictimService:FoodVictimService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getFoodVictims();
  }

  getFoodVictims(){
    this.foodVictimService.getFoodVictims().subscribe(response=>{
      this.victims=response.data;
      this.dataLoaded=true;
    })
  }

  delete(foodVictim: Victim) {
    this.foodVictimService.delete(foodVictim).subscribe(
      response => {
        this.toastrService.success("Gıda İhtiyacı Girişi Silindi!");
        this.getFoodVictims();
      },
      responseError => {
        this.toastrService.error(responseError.message, "Silinemedi!");
      })
  }

  isAdmin(userId: number) {
    this.userService.isAdmin(userId).subscribe(response => {
      this.userIsAdmin = response.success;
    })
  }
}
