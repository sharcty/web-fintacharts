import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  instruments: { id: string, value: string }[] = [];
  selectedInstrument: any;

  constructor(private data: DataService) {
    this.getData();
  }

  getData() {
    this.data.getInstruments().subscribe(
      res => {
        console.log('HTTP response', res);
        this.instruments = res.data.map((item: any) => ({
          id: item.id,
          value: item.symbol
        }));
        console.log('Instruments:', this.instruments);
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }

  subscribe() {
    console.log(this.selectedInstrument);
  }
}
