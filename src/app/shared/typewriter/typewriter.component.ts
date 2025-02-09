import { CommonModule } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-typewriter',
  imports: [CommonModule, TranslateModule],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.css'
})
export class TypewriterComponent implements OnInit {
  @Input() showHero: boolean = true;  // Receive `showHero` from parent

  text1 = "Zahtevi nisu ispunjeni"
  text2 = 'Tehnički fakulteti u blokadi'
  displayedText1 = '';
  displayedText2 = '';
  showCursor1 = true;
  showCursor2 = false;
  typingSpeed = 100;

  constructor(private zone: NgZone, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadTranslations();
  }

  loadTranslations(): void {
    this.translate.get(['typewriter.text1', 'typewriter.text2']).subscribe(translations => {
      this.text1 = translations['typewriter.text1'];
      this.text2 = translations['typewriter.text2'];

      if (this.showHero) {
        this.typeText1();  // Show full animation if on hero section
      } else {
        this.typeText2();  // Only show typewriter.text2 if NOT on hero
      }
    });
  }

  typeText1(): void {
    let index = 0;
    const typingInterval1 = setInterval(() => {
      if (index < this.text1.length) {
        this.displayedText1 += this.text1.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval1);
        this.showCursor1 = false;
        setTimeout(() => this.typeText2(), 1500);
      }
    }, this.typingSpeed);
  }

  typeText2(): void {
    this.showCursor2 = true;
    let index = 0;
    const typingInterval2 = setInterval(() => {
      if (index < this.text2.length) {
        this.displayedText2 += this.text2.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval2);
      }
    }, this.typingSpeed);
  }
}
