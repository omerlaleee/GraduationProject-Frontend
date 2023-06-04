import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperatorHelper } from 'src/app/models/operatorHelper';
import { AuthService } from 'src/app/services/auth.service';
import { OperatorHelperService } from 'src/app/services/operator-helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operator-helper',
  templateUrl: './operator-helper.component.html',
  styleUrls: ['./operator-helper.component.css']
})
export class OperatorHelperComponent implements OnInit {
  operatorHelpers: OperatorHelper[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private operatorHelperService: OperatorHelperService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getOperatorHelpers();
  }

  getOperatorHelpers() {
    this.operatorHelperService.getOperatorHelpers().subscribe(response => {
      this.operatorHelpers = response.data;
      this.dataLoaded = true;
    })
  }

  delete(operatorHelper: OperatorHelper) {
    this.operatorHelperService.delete(operatorHelper).subscribe(
      response => {
        this.toastrService.success(response.message, "İş Makinesi Yardımı Silindi!");
        this.getOperatorHelpers();
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
