import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit{

  constructor(private toastrService: ToastrService, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout();
    this.toastrService.info("Hesaptan çıkış yapıldı.");
    this.router.navigate(["/"]);
  }

  isAuthenticated(){
    return this.authService.isAuthenticated(window.localStorage.getItem("token"));
  }

}
