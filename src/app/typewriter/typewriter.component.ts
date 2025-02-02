import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  imports: [CommonModule],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent implements OnInit {
  text = 'Tehnički fakulteti u blokadi';
  displayedText = '';
  showCursor = true;
  typingSpeed = 100;

  ngOnInit(): void {
    this.typeText();
  }

  typeText(): void {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < this.text.length) {
        this.displayedText += this.text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        this.showCursor = true; 
      }
    }, this.typingSpeed);
  }
}
