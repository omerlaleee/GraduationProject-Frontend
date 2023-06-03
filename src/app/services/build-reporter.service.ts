import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { BuildReporter } from '../models/buildReporter';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BuildReporterService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getBuildReporters(): Observable<ListResponseModel<BuildReporter>> {
    let getAllUrl = this.apiUrl + "buildreporters/getbuildreporterdetails";
    return this.httpClient.get<ListResponseModel<BuildReporter>>(getAllUrl);
  }

  getBuildReportersByEmail(email:string): Observable<ListResponseModel<BuildReporter>> {
    let getAllUrl = this.apiUrl + "buildreporters/getbuildreporterdetailsbyemail?email"+email;
    return this.httpClient.get<ListResponseModel<BuildReporter>>(getAllUrl);
  }

  add(buildReporter: BuildReporter): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "buildreporters/add", buildReporter);
  }

  delete(buildReporter: BuildReporter): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "buildreporters/delete", buildReporter);
  }
}