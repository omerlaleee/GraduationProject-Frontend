import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransporterHelper } from 'src/app/models/transporterHelper';
import { AuthService } from 'src/app/services/auth.service';
import { TransporterHelperService } from 'src/app/services/transporter-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transporter-helper',
  templateUrl: './transporter-helper.component.html',
  styleUrls: ['./transporter-helper.component.css']
})
export class TransporterHelperComponent {
  transporterHelpers: TransporterHelper[];
  dataLoaded = false;
  filterTextFrom = "";
  filterTextTo = "";
  userIsAdmin: boolean;

  constructor(private transporterHelperService: TransporterHelperService, private userService: UserService, private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getTransporterHelpers();
  }

  getTransporterHelpers() {
    this.transporterHelperService.getTransporterHelpers().subscribe(response => {
      this.transporterHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  delete(transporterHelper: TransporterHelper) {
    this.transporterHelperService.delete(transporterHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "Bina Raporu Silindi!");
        this.getTransporterHelpers();
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
