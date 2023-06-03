import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TentHelper } from 'src/app/models/tentHelper';
import { AuthService } from 'src/app/services/auth.service';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { TentHelperService } from 'src/app/services/tent-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tent-helper',
  templateUrl: './tent-helper.component.html',
  styleUrls: ['./tent-helper.component.css']
})
export class TentHelperComponent {
  tentHelpers: TentHelper[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private tentHelperService: TentHelperService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getTentHelpers();
  }

  getTentHelpers() {
    this.tentHelperService.getTentHelpers().subscribe(response => {
      this.tentHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  delete(tentHelper: TentHelper) {
    this.tentHelperService.delete(tentHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Çadır Yardımı Girişi Silindi!");
        this.getTentHelpers();
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
