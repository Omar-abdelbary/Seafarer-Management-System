import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { envieonment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeafarersService {
  // injection HttpClient to use
  private readonly _HttpClient = inject(HttpClient);

  // get all seafarers
  getAllSeafarers(): Observable<any> {
    return this._HttpClient.get(
      `${envieonment.base_Url}/api/MarineServices/GetAllSeafarers?Direction=ltr&InCT`,

    );
  }

  // add new seafarer

  addSeafarer(seafarerDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${envieonment.base_Url}/api/MarineServices/SaveSeafarer?InCT`,
      seafarerDetails,

    );
  }


  //  edit seafarer
  EditSeafarer(seafarerDetails:object):Observable<any> {
    return this._HttpClient.post(`${envieonment.base_Url}/api/MarineServices/SaveSeafarer?InCT` ,
      seafarerDetails,

    )
  }

  // FillVendor
  FillVendor(): Observable<any> {
    return this._HttpClient.get(
      `${envieonment.base_Url}/api/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`,

    );
  }

  // FillEmployee

  FillEmployee(): Observable<any> {
    return this._HttpClient.get(
      `${envieonment.base_Url}/api/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT` ,
      // { headers: { Authorization: `Bearer ${localStorage.getItem('App_Token')}` } }
    );
  }



  //  change status seafarers

  changeStatus(Id:number | string| null , EmpId:string |number |null , Status:string | number |null):Observable<any> {
    return this._HttpClient.post(`${envieonment.base_Url}/api/MarineServices/ActivateAndInActivateSeafarer?Id=${Id}&InCT&Status=${Status}&EmpId=${EmpId}` ,
      null ,

    )
  }






}
