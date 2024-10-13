import { Component } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { DataService } from '../services/data.service';
import ApexCharts from 'apexcharts';

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
  chart: ApexCharts|undefined;

  constructor(private subscriptionService: SubscriptionService, private data:DataService) {}

  ngOnInit() {
    this.subscriptionService.selectedInstrument$.subscribe(id => {
      this.selectedInstrumentID = id;
      this.data.getHistoricalData(id).subscribe(
        res => {  
            this.instrumentData = res.data.map((dataPoint: any) => ({
              x: new Date(dataPoint.t),
              y: [dataPoint.o, dataPoint.h, dataPoint.l, dataPoint.c]
            }));
  
            if (!this.chart) {
              this.drawChart();
            } else {
              this.chart.updateSeries([{
                data: this.instrumentData
              }]);
            }
        },
        err => console.log('HTTP Error', err),
        () => {
          console.log('HTTP request completed.');
        }
      );
    });
  }
  
  drawChart(){
    var options = {
      chart: {
        type: 'candlestick'
      },
      series: [{
        data: this.instrumentData
      }],
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function(value: number) {
            const date = new Date(value);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  
    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  }
  
}
