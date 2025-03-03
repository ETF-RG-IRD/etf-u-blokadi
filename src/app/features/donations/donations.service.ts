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
  private apiUrl = this.getApiUrl();

  constructor(private http: HttpClient) {}

  private getApiUrl(): string {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost') {
      return 'http://localhost:3000/api/donations';
    } else if (hostname.includes('netlify.app')) {
      return '/.netlify/functions/donations';
    } else if (hostname === 'etfublokadi.rs' || hostname.includes('etfublokadi.rs')) {
      // Production domain handling
      return '/api/donations';
    } else {
      // Fallback for any other domains
      return '/api/donations';
    }
  }

  getDonations(): Observable<DonationData> {
    return this.http.get<DonationData>(this.apiUrl);
  }
}
