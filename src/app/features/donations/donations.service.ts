// donation-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DonationData {
  [school: string]: string[];
}

@Injectable({ providedIn: 'root' })
export class DonationDataService {
  // Choose the API URL based on the hostname.
  private apiUrl = window.location.hostname.includes('netlify.app')
    ? '/.netlify/functions/donations'
    : '/api/donations';

  constructor(private http: HttpClient) {}

  getDonations(): Observable<DonationData> {
    return this.http.get<DonationData>(this.apiUrl);
  }
}
