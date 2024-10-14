import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';
import { SubscriptionService } from '../services/subscription.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css']
})
export class MarketDataComponent implements OnInit, OnDestroy {
  private messageSubscription: Subscription = new Subscription();
  public marketData: any;
  public errorMessage: string | null = null;
  public selectedInstrumentID: string | undefined;
  public selectedInstrumentValue: string | undefined;

  constructor(
    private websocketService: WebsocketService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.subscriptionService.selectedInstrumentId$.subscribe(id => {
      this.selectedInstrumentID = id;
      if (this.selectedInstrumentID) {
        this.sendSubscriptionMessage(this.selectedInstrumentID);
      }
    });

    this.subscriptionService.selectedInstrumentValue$.subscribe(value => {
      if (value) {
        this.selectedInstrumentValue = value;
      }
    });

    this.websocketService.connect();

    this.messageSubscription = this.websocketService.webSocket$.subscribe(
      (message) => {
        this.handleIncomingMessage(message);
      },
      (error) => {
        this.errorMessage = `Error: ${error}`;
        console.error('Error received from WebSocket:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.websocketService.disconnect();
  }

  private handleIncomingMessage(message: any): void {
    console.log('Received message:', message);
    this.marketData = message;
  }

  private sendSubscriptionMessage(instrumentId: string): void {
    const subscriptionMessage = {
      type: 'l1-subscription',
      id: '1',
      instrumentId: instrumentId,
      provider: 'simulation',
      subscribe: true,
      kinds: ['last']
    };

    console.log('Sending subscription message:', subscriptionMessage);
    this.websocketService.sendMessage(subscriptionMessage);
  }

  isPriceReady(){
    return this.marketData && this.marketData.last && this.marketData.last.price;
  }
}
