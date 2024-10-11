import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private selectedInstrumentSubject = new BehaviorSubject<string>("");
  selectedInstrument$ = this.selectedInstrumentSubject.asObservable();

  setSelectedInstrument(id: string) {
    this.selectedInstrumentSubject.next(id);
  }
}
