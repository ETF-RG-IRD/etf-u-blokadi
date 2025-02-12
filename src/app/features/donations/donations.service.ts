// donation-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DonationItem {
  name: string;
  types: string[];
}

export interface DonationData {
  [school: string]: DonationItem[];
}

@Injectable({ providedIn: 'root' })
export class DonationDataService {
  // Determine the API URL based on the hostname.
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/donations'
      : window.location.hostname.includes('netlify.app')
        ? '/.netlify/functions/donations'
        : '/api/donations';

  constructor(private http: HttpClient) {}

  getDonations(): Observable<DonationData> {
    return this.http.get<DonationData>(this.apiUrl);
  }
}
