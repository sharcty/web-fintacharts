import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private selectedInstrumentIdSubject = new BehaviorSubject<string>("");
  selectedInstrumentId$ = this.selectedInstrumentIdSubject.asObservable();

  private selectedInstrumentValueSubject = new BehaviorSubject<string>("");
  selectedInstrumentValue$ = this.selectedInstrumentValueSubject.asObservable();

  setSelectedInstrument(id: string, value:string) {
    this.selectedInstrumentIdSubject.next(id);
    this.selectedInstrumentValueSubject.next(value);
  }
}