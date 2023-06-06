import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Victim } from '../models/victim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class VictimService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getAllVictimsByEmail(email: string | any): Observable<ListResponseModel<Victim>> {
    let getAllVictimsByEmailUrl = this.apiUrl + "victims/getallbyemail?email=" + email;
    return this.httpClient.get<ListResponseModel<Victim>>(getAllVictimsByEmailUrl);
  }

  getAllVictims(): Observable<ListResponseModel<Victim>> {
    let getAllUrl = this.apiUrl + "victims/getall";
    return this.httpClient.get<ListResponseModel<Victim>>(getAllUrl);
  }

  delete(victim: Victim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "victims/delete", victim);
  }
}