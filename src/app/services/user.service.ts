import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getUsers(): Observable<ListResponseModel<User>> {
    let getAllUrl = this.apiUrl + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(getAllUrl);
  }

  add(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "users/add", user);
  }
}
