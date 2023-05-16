import { Injectable } from '@angular/core';
import { Victim } from '../models/victim';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class VictimService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getFoodHelpers(): Observable<ListResponseModel<Victim>> {
    let getAllUrl = this.apiUrl + "victims/getall";
    return this.httpClient.get<ListResponseModel<Victim>>(getAllUrl);
  }

  add(victim: Victim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "victims/add", victim);
  }
}
