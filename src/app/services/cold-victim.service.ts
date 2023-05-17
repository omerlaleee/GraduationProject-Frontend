import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Victim } from '../models/victim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColdVictimService {


  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getColdVictims(): Observable<ListResponseModel<Victim>> {
    let getAllUrl = this.apiUrl + "victims/getall";
    return this.httpClient.get<ListResponseModel<Victim>>(getAllUrl);
  }

  add(victim: Victim): Observable<ResponseModel> {
    victim.victimType="Cold";
    return this.httpClient.post<ResponseModel>(this.apiUrl + "victims/add", victim);
  }
}
