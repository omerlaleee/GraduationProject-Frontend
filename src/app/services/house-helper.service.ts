import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { HouseHelper } from '../models/houseHelper';
import { ListResponseModel } from '../models/listResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getHouseHelpers(): Observable<ListResponseModel<HouseHelper>> {
    let getAllUrl = this.apiUrl + "househelpers/gethousehelperdetails";
    return this.httpClient.get<ListResponseModel<HouseHelper>>(getAllUrl);
  }

  add(houseHelper: HouseHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "househelpers/add", houseHelper);
  }
}
