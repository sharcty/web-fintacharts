import { Component } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  selectedInstrumentID: string | undefined;
  instrumentData: any;

  constructor(private subscriptionService: SubscriptionService, private data:DataService) {}

  ngOnInit() {
    this.subscriptionService.selectedInstrument$.subscribe(id => {
      this.selectedInstrumentID = id;
      this.data.getHistoricalData(id).subscribe(
        res => {
          console.log('HTTP response', res);
          this.instrumentData = res;
        },
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
      );
    });
  }
}
