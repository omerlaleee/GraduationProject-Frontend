import { Component, OnInit } from '@angular/core';
import { BuildReporter } from 'src/app/models/buildReporter';
import { BuildReporterService } from 'src/app/services/build-reporter.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-build-reporter',
  templateUrl: './build-reporter.component.html',
  styleUrls: ['./build-reporter.component.css']
})
export class BuildReporterComponent implements OnInit {

  buildReporters: BuildReporter[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private buildReporterService: BuildReporterService, private toastrService: ToastrService, public authService: AuthService
    , public userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getBuildReporters();
  }

  getBuildReporters() {
    this.buildReporterService.getBuildReporters().subscribe(response => {
      this.buildReporters = response.data;
      this.dataLoaded = true;
    });
  }

  delete(buildReporter: BuildReporter) {
    this.buildReporterService.delete(buildReporter).subscribe(
      response => {
        this.toastrService.success(response.message, "Bina Raporu Silindi!");
        this.getBuildReporters();
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
