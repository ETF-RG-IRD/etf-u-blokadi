import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})

export class FaqComponent {
    faqItems = [
      { question: "Šta je plenum?", answer: "Na plenumu studenti glasaju o bitnim pitanja.", isOpen: false },
      { question: "Kako mogu da pomognem?", answer: "Donacijama (link) i izlaženjem na proteste.", isOpen: false }
  ];

  toggleItem(index: number): void {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
