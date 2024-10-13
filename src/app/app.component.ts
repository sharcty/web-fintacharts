import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { MarketDataComponent } from "./market-data/market-data.component";
import { ChartComponent } from "./chart/chart.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SubscribeComponent, MarketDataComponent, ChartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-fintacharts';
  isLoggedIn = false; 
  constructor(private authService: AuthService) {
    this.loginWithAlerts();
  }

  loginWithAlerts() {
    const username = prompt('Enter your username:');
    if (!username) {
      alert('Username is required!');
      return;
    }
    const password = prompt('Enter your password:');
    if (!password) {
      alert('Password is required!');
      return;
    }
    this.authService.login(username, password).subscribe(
      apiKey => {
        alert('Login successful! Your API key is ready');
        this.isLoggedIn = true;
      },
      error => {
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
}
