import { Injectable } from '@angular/core';
import { TentHelper } from '../models/tentHelper';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TentHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getFoodHelpers(): Observable<ListResponseModel<TentHelper>> {
    let getAllUrl = this.apiUrl + "tenthelpers/getall";
    return this.httpClient.get<ListResponseModel<TentHelper>>(getAllUrl);
  }

  add(operatorHelper: TentHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "tenthelpers/add", operatorHelper);
  }
}
