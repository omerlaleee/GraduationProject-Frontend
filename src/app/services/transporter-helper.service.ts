import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { TentHelper } from '../models/tentHelper';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TransporterHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getFoodHelpers(): Observable<ListResponseModel<TentHelper>> {
    let getAllUrl = this.apiUrl + "transporterhelpers/getall";
    return this.httpClient.get<ListResponseModel<TentHelper>>(getAllUrl);
  }

  add(operatorHelper: TentHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "transporterhelpers/add", operatorHelper);
  }
}
