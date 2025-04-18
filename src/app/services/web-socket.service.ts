import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.socket = new WebSocket(`ws://localhost:8080`);


    this.socket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
    };

    this.socket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      this.messageSubject.complete();
    };
  }


  // Method to listen for incoming messages
  public get_messages(): Observable<any> {
    return this.messageSubject.asObservable();
  }


  public close_connection(): void {
    this.socket.close();
  }
}
