import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Announcement {
  message_id?: number;
  date?: number;
  text?: string;
  caption?: string;
  // You can add other fields from the Telegram channel_post as needed
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements(): void {
    // Updated to hit the Express API on port 3000 directly.
    this.http.get<Announcement[]>('http://localhost:3000/api/announcements')
      .subscribe({
        next: (data) => {
          this.announcements = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching announcements:', error);
          this.errorMessage = 'Error fetching announcements';
          this.isLoading = false;
        }
      });
  }
}
