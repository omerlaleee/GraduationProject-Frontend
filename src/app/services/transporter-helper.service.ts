import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { TransporterHelper } from '../models/transporterHelper';

@Injectable({
  providedIn: 'root'
})
export class TransporterHelperService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getTransporterHelpers(): Observable<ListResponseModel<TransporterHelper>> {
    let getAllUrl = this.apiUrl + "transporterhelpers/gettransporterhelperdetails";
    return this.httpClient.get<ListResponseModel<TransporterHelper>>(getAllUrl);
  }

  getTransporterHelpersByEmail(email:string): Observable<ListResponseModel<TransporterHelper>> {
    let getAllUrl = this.apiUrl + "transporterhelpers/gettransporterhelperdetailsbyemail?email="+email;
    return this.httpClient.get<ListResponseModel<TransporterHelper>>(getAllUrl);
  }

  add(operatorHelper: TransporterHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "transporterhelpers/add", operatorHelper);
  }

  delete(operatorHelper: TransporterHelper): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "transporterhelpers/delete", operatorHelper);
  }
}
