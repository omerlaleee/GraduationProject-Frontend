import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FoodHelper } from 'src/app/models/foodHelper';
import { AuthService } from 'src/app/services/auth.service';
import { FoodHelperService } from 'src/app/services/food-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food-helper',
  templateUrl: './food-helper.component.html',
  styleUrls: ['./food-helper.component.css']
})
export class FoodHelperComponent {
  foodHelpers: FoodHelper[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;
  
  constructor(private foodHelperService:FoodHelperService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getFoodHelpers();
  }

  getFoodHelpers(){
    this.foodHelperService.getFoodHelpers().subscribe(response=>{
      this.foodHelpers=response.data;
      this.dataLoaded=true;
    })
  }

  delete(foodHelper: FoodHelper) {
    this.foodHelperService.delete(foodHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Yemek Yardım Girişi Silindi!");
        this.getFoodHelpers();
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
