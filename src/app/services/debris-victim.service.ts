import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Victim } from '../models/victim';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DebrisVictimService {


  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getDebrisVictims(): Observable<ListResponseModel<Victim>> {
    let getAllUrl = this.apiUrl + "victims/getall";
    return this.httpClient.get<ListResponseModel<Victim>>(getAllUrl);
  }

  add(victim: Victim): Observable<ResponseModel> {
    victim.victimType="Debris";
    return this.httpClient.post<ResponseModel>(this.apiUrl + "victims/add", victim);
  }
}
