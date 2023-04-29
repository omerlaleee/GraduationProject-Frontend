import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { BuildReporter } from '../models/buildReporter';

@Injectable({
  providedIn: 'root'
})
export class BuildReporterService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  getBuildReporters(): Observable<ListResponseModel<BuildReporter>> {
    let getAllUrl = this.apiUrl + "buildreporters/getall";
    return this.httpClient.get<ListResponseModel<BuildReporter>>(getAllUrl);
  }

}
