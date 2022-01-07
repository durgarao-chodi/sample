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
    return this.http.get('../assets/sample1_data.json');
  }
  getViewData(columnName:string|null):Observable<any>{
    return this.http.get('../assets/table_data.json');
  }
}
