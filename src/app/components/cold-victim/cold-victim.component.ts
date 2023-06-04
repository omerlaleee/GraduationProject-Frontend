import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Victim } from 'src/app/models/victim';
import { AuthService } from 'src/app/services/auth.service';
import { ColdVictimService } from 'src/app/services/cold-victim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cold-victim',
  templateUrl: './cold-victim.component.html',
  styleUrls: ['./cold-victim.component.css']
})
export class ColdVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private coldVictimService: ColdVictimService, private toastrService: ToastrService, public authService: AuthService
    , public userService: UserService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getColdVictims();
  }

  getColdVictims() {
    this.coldVictimService.getColdVictims().subscribe(response => {
      this.victims = response.data;
      this.dataLoaded = true;
    })
  }

  delete(coldVictim: Victim) {
    this.coldVictimService.delete(coldVictim).subscribe(
      response => {
        this.toastrService.success("Isınma Raporu Silindi!");
        this.getColdVictims();
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
