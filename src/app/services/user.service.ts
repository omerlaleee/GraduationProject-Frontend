import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ClaimModel } from '../models/claimModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { 
  }

  apiUrl = "https://localhost:44314/api/";

  getUsers(): Observable<ListResponseModel<User>> {
    let getAllUrl = this.apiUrl + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(getAllUrl);
  }

  getUserByEmail(email: string | null): Observable<SingleResponseModel<User>> {
    let getUserByEmailUrl = this.apiUrl + "users/getbyemail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(getUserByEmailUrl);
  }

  add(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "users/add", user);
  }

  // getClaimsOfUser(userId: number | null): Observable<SingleResponseModel<ClaimModel>> {
  //   let getUserByEmailUrl = this.apiUrl + "users/getbyemail?email=" + email;
  //   return this.httpClient.get<SingleResponseModel<User>>(getUserByEmailUrl);
  // }
  
}
