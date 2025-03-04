import { Component, OnDestroy, OnInit } from '@angular/core';
import { WipComponent } from '../../wip/wip.component';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { format, toZonedTime } from 'date-fns-tz'; // Import date-fns functions


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
        const JSON_message = JSON.parse(message);
        const type = JSON_message.type;

        console.log(JSON_message)

        switch (type) {
          case 'history':
            // Handle message history (pairs of message and date)
            JSON_message.data.forEach((messageData: any) => {
              this.messages.push({
                text: messageData.text, // The message text
                date: this.formatDateToCET(messageData.date) // The message date
              });
            });
            break;

          case 'announcement':
            // Handle new announcements (pairs of message and date)
            this.messages.push({
              text: JSON_message.data.text, // The message text
              date: this.formatDateToCET(JSON_message.data.date) // The message date
            });
            break;

          default:
            break;
        }
        console.log(this.messages)
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

  /**
   * Helper function to format a UTC date to CET timezone in dd-MM-yyyy HH:mm format.
   * @param dateString The date string in UTC format.
   * @returns The formatted date string in CET timezone.
   */
  private formatDateToCET(dateString: string): string {
    // Define the CET timezone
    const timeZone = 'Europe/Berlin'; // CET timezone

    // Parse the UTC date string into a Date object
    const utcDate = new Date(dateString);

    // Convert the UTC date to CET timezone
    const cetDate = toZonedTime(utcDate, timeZone);

    // Format the date to dd-MM-yyyy HH:mm
    return format(cetDate, 'dd-MM-yyyy HH:mm', { timeZone });
  }
}
