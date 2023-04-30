import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  

  // getBuildReporters(): Observable<ListResponseModel<BuildReporter>> {
  //   let getAllUrl = this.apiUrl + "buildreporters/getall";
  //   return this.httpClient.get<ListResponseModel<BuildReporter>>(getAllUrl);
  // }

}
