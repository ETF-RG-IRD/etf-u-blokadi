import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsBotService {

  constructor(private http: HttpClient) { }

  getMessage(){
    return this.http.get(
      'http://localhost:3000/api/message'
    )
  }
}
