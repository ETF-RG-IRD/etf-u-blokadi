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
    /**
     * Messages are sent in this format
     * {
     *  type: <MESSAGE_TYPE>,
     *  data: <MESSAGE_DATA>
     * }
     * For now there is a special message for the message history:
     * {
     *  type: 'history',
     *  data: [
     *    {
     *      type: <MESSAGE_TYPE>
     *      data: <MESSAGE_DATA>
     *    },
     *    ...
     *  ]
     * }
     */
    this.messageSubscription = this.webSocketService.get_messages().subscribe({
      next: (message) => {

        const data = JSON.parse(JSON.parse(message).data);
        // console.log(data);
        // console.log(JSON.parse(message))
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
