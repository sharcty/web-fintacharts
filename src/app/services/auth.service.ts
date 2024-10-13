import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey: string | null = null;
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string| null> {
    const url = 'https://platform.fintacharts.com/identity/realms/fintatech/protocol/openid-connect/token';
    const data = new HttpParams()
    .set('client_id', 'app-cli')
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');

    return this.http.post<any>(url, data.toString(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }).pipe(
      map(response => {
        this.apiKey = response.access_token;
        return this.apiKey;
      })
    );
  }

  getApiKey(): string | null {
    return this.apiKey;
  }
}
