import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  apiUrl = "https://localhost:44314/api/auth/";
  helper = new JwtHelperService();
  loggedInUser: User = { id: 0, email: "", firstName: "", lastName: "", passwordHash: "", passwordSalt: "", phoneNumber: "", status: false, claims: [] };

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    this.getLoggedInUser(loginModel.email);
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  getLoggedInUser(email: string | null) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.loggedInUser = response.data;
      //console.log(this.loggedInUser);
    });
  }

  logout() {
    this.loggedInUser = { id: 0, email: "", firstName: "", lastName: "", passwordHash: "", passwordSalt: "", phoneNumber: "", status: false, claims: [] };
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  isAuthenticated(token: string | null) {
    return !this.helper.isTokenExpired(token);
  }

}
