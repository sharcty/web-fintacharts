import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { MarketDataComponent } from "./market-data/market-data.component";
import { ChartComponent } from "./chart/chart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubscribeComponent, MarketDataComponent, ChartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-fintacharts';
}
