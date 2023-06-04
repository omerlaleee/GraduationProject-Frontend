import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HouseHelper } from 'src/app/models/houseHelper';
import { AuthService } from 'src/app/services/auth.service';
import { HouseHelperService } from 'src/app/services/house-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-house-helper',
  templateUrl: './house-helper.component.html',
  styleUrls: ['./house-helper.component.css']
})
export class HouseHelperComponent {
  houseHelpers: HouseHelper[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private houseHelperService:HouseHelperService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService){}

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getHouseHelpers();
  }

  getHouseHelpers(){
    this.houseHelperService.getHouseHelpers().subscribe(response=>{
      this.houseHelpers=response.data;
      this.dataLoaded=true;
    })
  }

  delete(houseHelper: HouseHelper) {
    this.houseHelperService.delete(houseHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Barınma Yardımı Girişi Silindi!");
        this.getHouseHelpers();
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
