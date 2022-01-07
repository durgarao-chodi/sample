import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataQualityService {

  constructor(private http:HttpClient){ 
  }
  getReportData() :Observable<any>{ 
    return this.http.get('https://dataqualityteam4.azurewebsites.net/fetchErrorCount')
  }
  getViewData(errorCode:string|null):Observable<any>{
    return this.http.get(`https://dataqualityteam4.azurewebsites.net/fetchErrorData?errorCode=${errorCode}`);
  }
}
