import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule, TranslateModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqItems = [
    { question: 'faq.question1', answer: 'faq.answer1', isOpen: false },
    { question: 'faq.question2', answer: 'faq.answer2', isOpen: false },
    { question: 'faq.question3', answer: 'faq.answer3', isOpen: false },
    { question: 'faq.question4', answer: 'faq.answer4', isOpen: false },
    { question: 'faq.question5', answer: 'faq.answer5', isOpen: false },
    { question: 'faq.question6', answer: 'faq.answer6', isOpen: false },
    { question: 'faq.question7', answer: 'faq.answer7', isOpen: false },
    { question: 'faq.question8', answer: 'faq.answer8', isOpen: false },
    { question: 'faq.question9', answer: 'faq.answer9', isOpen: false },
    { question: 'faq.question10', answer: 'faq.answer10', isOpen: false },
    { question: 'faq.question11', answer: 'faq.answer11', isOpen: false },
    { question: 'faq.question12', answer: 'faq.answer12', isOpen: false }

  ];

  constructor(private translate: TranslateService) {
    this.translate.get([
      'faq.question1', 'faq.answer1', 
      'faq.question2', 'faq.answer2', 
      'faq.question3', 'faq.answer3',
      'faq.question4', 'faq.answer4',
      'faq.question5', 'faq.answer5',
      'faq.question6', 'faq.answer6',
      'faq.question7', 'faq.answer7',
      'faq.question8', 'faq.answer8',
      'faq.question9', 'faq.answer9',
      'faq.question10', 'faq.answer10',
      'faq.question11', 'faq.answer11',
      'faq.question12', 'faq.answer12',
      'faq.question13', 'faq.answer13',
      'faq.question14', 'faq.answer14',
      'faq.question15', 'faq.answer15',
      'faq.question16', 'faq.answer16'
    ]).subscribe(translations => {
      this.faqItems.forEach((item, index) => {
        item.question = translations[`faq.question${index + 1}`];
        item.answer = translations[`faq.answer${index + 1}`];
      });
    });
  }

  toggleItem(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
