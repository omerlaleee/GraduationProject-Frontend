import { Component, OnInit } from '@angular/core';
import { Victim } from 'src/app/models/victim';
import { DebrisVictimService } from 'src/app/services/debris-victim.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-debris-victim',
  templateUrl: './debris-victim.component.html',
  styleUrls: ['./debris-victim.component.css']
})
export class DebrisVictimComponent implements OnInit {
  victims: Victim[];
  dataLoaded = false;
  filterText = "";
  userIsAdmin: boolean;

  constructor(private debrisVictimService: DebrisVictimService, public authService: AuthService, public userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser != undefined && this.authService.loggedInUser.id != 0) {
      this.isAdmin(this.authService.loggedInUser.id);
    }
    this.getDebrisVictims();
  }

  getDebrisVictims() {
    this.debrisVictimService.getDebrisVictims().subscribe(response => {
      this.victims = response.data;
      this.dataLoaded = true;
    })
  }

  delete(debrisVictim: Victim) {
    this.debrisVictimService.delete(debrisVictim).subscribe(
      response => {
        this.toastrService.success("Enkaz Raporu Silindi!");
        this.getDebrisVictims();
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
