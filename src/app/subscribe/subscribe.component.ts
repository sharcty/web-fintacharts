import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  instruments: { id: string, value: string }[] = [];
  selectedInstrument: { id: string, value: string } = { id: 'test', value: '' };

  constructor(private data: DataService, private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.data.getInstruments().subscribe(
      res => {
        this.instruments = res.data.map((item: any) => ({
          id: item.id,
          value: item.symbol
        }));
        if(this.selectedInstrument.id=='test'){
          this.selectedInstrument = this.instruments[0];
          this.subscribe();
        }
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }

  subscribe() {
    console.log(this.selectedInstrument.id + this.selectedInstrument.value)
    this.subscriptionService.setSelectedInstrument(this.selectedInstrument.id, this.selectedInstrument.value);
  }
}
