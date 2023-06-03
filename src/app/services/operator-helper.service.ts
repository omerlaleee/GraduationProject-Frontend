import { Injectable } from '@angular/core';
import { OperatorHelper } from '../models/operatorHelper';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getOperatorHelpers(): Observable<ListResponseModel<OperatorHelper>> {
    let getAllUrl = this.apiUrl + "operatorhelpers/getoperatorhelperdetails";
    return this.httpClient.get<ListResponseModel<OperatorHelper>>(getAllUrl);
  }

  getOperatorHelpersByEmail(email:string): Observable<ListResponseModel<OperatorHelper>> {
    let getAllUrl = this.apiUrl + "operatorhelpers/getoperatorhelperdetailsbyemail?email="+email;
    return this.httpClient.get<ListResponseModel<OperatorHelper>>(getAllUrl);
  }

  add(operatorHelper: OperatorHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "operatorhelpers/add", operatorHelper);
  }

  delete(operatorHelper: OperatorHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "operatorhelpers/delete", operatorHelper);
  }
}