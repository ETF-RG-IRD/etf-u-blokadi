import { Component, OnDestroy, OnInit } from '@angular/core';
import { WipComponent } from '../../wip/wip.component';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-announcements',
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  private messageSubscription: Subscription | undefined;
  public messages: any[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.messageSubscription = this.webSocketService.get_messages().subscribe({
      next: (message) => {
        let data = JSON.parse(message).data
        data = JSON.parse(data)


        this.messages.push(data);

      },
      error: (error) => {
        console.error('Error receiving message:', error);
      },
      complete: () => {
        console.log('WebSocket connection closed');
      },
    });

  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.webSocketService.close_connection();
  }
}
