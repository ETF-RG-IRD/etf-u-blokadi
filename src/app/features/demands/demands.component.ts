import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface AccordionItem {
  title: string;
  content: string;
  isOpen: boolean;
  isFulfilled: boolean;
}

@Component({
  selector: 'app-demands',
  imports: [CommonModule, TranslateModule],
  templateUrl: './demands.component.html',
  styleUrl: './demands.component.css'
})
export class DemandsComponent {

  accordionItems: AccordionItem[] = [
    {
      title: 'zahtev1.naslov',  // Placeholder text for translation
      content: 'zahtev1.sadrzaj', // Placeholder text for translation
      isOpen: false,
      isFulfilled: false
    },
    {
      title: 'zahtev2.naslov',
      content: 'zahtev2.sadrzaj',
      isOpen: false,
      isFulfilled: false
    },
    {
      title: 'zahtev3.naslov',
      content: 'zahtev3.sadrzaj',
      isOpen: false,
      isFulfilled: false
    },
    {
      title: 'zahtev4.naslov',
      content: 'zahtev4.sadrzaj',
      isOpen: false,
      isFulfilled: false
    }
  ];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.loadTranslations();
  }

  loadTranslations(): void {
    // Dynamically translate titles and contents
    this.translate.get(['zahtev1.naslov', 'zahtev1.sadrzaj', 'zahtev2.naslov', 'zahtev2.sadrzaj',
      'zahtev3.naslov', 'zahtev3.sadrzaj', 'zahtev4.naslov', 'zahtev4.sadrzaj'])
      .subscribe(translations => {
        this.accordionItems[0].title = translations['zahtev1.naslov'];
        this.accordionItems[0].content = translations['zahtev1.sadrzaj'];
        this.accordionItems[1].title = translations['zahtev2.naslov'];
        this.accordionItems[1].content = translations['zahtev2.sadrzaj'];
        this.accordionItems[2].title = translations['zahtev3.naslov'];
        this.accordionItems[2].content = translations['zahtev3.sadrzaj'];
        this.accordionItems[3].title = translations['zahtev4.naslov'];
        this.accordionItems[3].content = translations['zahtev4.sadrzaj'];
      });
  }

  // Toggle accordion item
  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }
}
