import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperationClaimModel } from '../models/operationClaimModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44314/api/";

  add(operationClaim: OperationClaimModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "operationclaims/add", operationClaim);
  }

  delete(operationClaim: OperationClaimModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "operationclaims/delete", operationClaim);
  }

  getAll(): Observable<ListResponseModel<OperationClaimModel>> {
    let getAllUrl = this.apiUrl + "operationclaims/getall";
    return this.httpClient.get<ListResponseModel<OperationClaimModel>>(getAllUrl);
  }

  getById(id: number): Observable<SingleResponseModel<OperationClaimModel>> {
    let getByIdUrl = this.apiUrl + "operationclaims/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<OperationClaimModel>>(getByIdUrl);
  }

  update(operationClaim: OperationClaimModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "operationclaims/update", operationClaim);
  }
}
