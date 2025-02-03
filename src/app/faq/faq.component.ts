import { Component, OnInit } from '@angular/core';
import { NewsBotService } from '../services/news-bot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  message: any;

  constructor(private news: NewsBotService) {}
  ngOnInit(): void {
    this.news.getMessage().subscribe(data => {
      this.message = data;
    })
  }
}
