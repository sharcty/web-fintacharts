import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private URL:string;
  private ws: WebSocketSubject<any> | undefined;
  public webSocket$ = new Subject<any>();

  constructor(private authService: AuthService){
    const API_WS_URL = 'wss://platform.fintacharts.com/api/streaming/ws/v1/realtime?token=';
    this.URL = API_WS_URL + this.authService.getApiKey();
  }

  connect(): void {
    this.ws = webSocket(this.URL);
    
    this.ws.subscribe(
      (message) => {
        this.webSocket$.next(message);
      },
      (err) => {
        console.error('WebSocket error:', err);
      },
      () => {
        console.log('WebSocket connection closed');
      }
    );
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.complete();
      console.log('WebSocket connection closed');
    }
  }

  sendMessage(msg: any): void {
    if (this.ws) {
      this.ws.next(msg);
    } else {
      console.error('WebSocket is not connected');
    }
  }
}
