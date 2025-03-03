// donation-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) {
    console.log('Using API URL:', this.apiUrl);
  }

  private getApiUrl(): string {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost') {
      return 'http://localhost:3000/api/donations';
    } else if (hostname.includes('netlify.app')) {
      return '/.netlify/functions/donations';
    } else if (hostname === 'etfublokadi.rs' || hostname.includes('etfublokadi.rs')) {
      // For production domain, use your API endpoint
      return '/api/donations';  // Changed from Netlify functions to your API endpoint
    } else {
      // Fallback for any other domains
      return '/api/donations';  // Also update this fallback
    }
  }

  getDonations(): Observable<DonationData> {
    return this.http.get<DonationData>(this.apiUrl).pipe(
      retry(1),
      catchError(error => {
        console.error('Error fetching donations:', error);
        // If there's an error with the selected API URL, try the Netlify function as a fallback
        if (this.apiUrl !== '/.netlify/functions/donations') {
          console.log('Falling back to Netlify function endpoint');
          return this.http.get<DonationData>('/.netlify/functions/donations');
        }
        return throwError(() => error);
      })
    );
  }
}
