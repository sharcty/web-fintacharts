import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.API_URL;
  private apiKey = environment.API_KEY;
  private headers:HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

  }

  getInstruments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/instruments/v1/instruments?provider=oanda&kind=forex`, { headers: this.headers}, );
  }

  getHistoricalData(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/bars/v1/bars/count-back?instrumentId=${id}&provider=oanda&interval=1&periodicity=minute&barsCount=10`, { headers: this.headers}, );
  }
}
