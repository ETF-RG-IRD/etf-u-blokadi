// donation-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DonationData {
  [school: string]: string[];
}

@Injectable({ providedIn: 'root' })
export class DonationDataService {

  private apiUrl = '/.netlify/functions/donations';


  constructor(private http: HttpClient) {}

  getDonations(): Observable<DonationData> {
    return this.http.get<DonationData>(this.apiUrl);
  }
}
