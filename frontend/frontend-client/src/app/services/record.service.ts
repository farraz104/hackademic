import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private baseUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  createRecord(record: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}registro`, record);
  }

  getRecordsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}historial`);
  }
}
