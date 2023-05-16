import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodHelper } from '../models/foodHelper';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FoodHelperServiceService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getFoodHelpers(): Observable<ListResponseModel<FoodHelper>> {
    let getAllUrl = this.apiUrl + "foodhelpers/getall";
    return this.httpClient.get<ListResponseModel<FoodHelper>>(getAllUrl);
  }

  add(foodHelper: FoodHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "foodhelpers/add", foodHelper);
  }
}
