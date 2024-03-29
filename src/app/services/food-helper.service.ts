import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodHelper } from '../models/foodHelper';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FoodHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getFoodHelpers(): Observable<ListResponseModel<FoodHelper>> {
    let getAllUrl = this.apiUrl + "foodhelpers/getfoodhelperdetails";
    return this.httpClient.get<ListResponseModel<FoodHelper>>(getAllUrl);
  }

  getFoodHelpersByEmail(email:string): Observable<ListResponseModel<FoodHelper>> {
    let getAllUrl = this.apiUrl + "foodhelpers/getfoodhelperdetailsbyemail?email="+email;
    return this.httpClient.get<ListResponseModel<FoodHelper>>(getAllUrl);
  }

  add(foodHelper: FoodHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "foodhelpers/add", foodHelper);
  }

  delete(foodHelper: FoodHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "foodhelpers/delete", foodHelper);
  }
}
