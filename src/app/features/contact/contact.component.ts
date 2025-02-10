// Language: TypeScript
import { Component, ChangeDetectorRef, ElementRef, Renderer2, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None, // Ensures CSS works on dynamically added elements
  animations: [
    trigger('modalAnimation', [
      // When modal enters, fade in and slide down
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      // When modal leaves, fade out and slide up
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ContactComponent implements AfterViewChecked {
  contactLines: string[] = [];

  // Changed type to string for simpler concatenation
  displayText: string = "";
  cursorVisible: boolean = false;
  private lineIndex = 0;
  private charIndex = 0;
  private isTypingFinished = false;

  // New properties for the custom modal
  modalVisible: boolean = false;
  modalMessage: string = "";
  private modalTimeout: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) {
    this.loadTranslations();
    setInterval(() => {
      this.cdr.detectChanges();
      this.toggleCursorVisibility();
    }, 500);
  }

  loadTranslations(): void {
    this.translate.get([
      'SCHOOLS.ETF',
      'SCHOOLS.GRAĐEVINSKI',
      'SCHOOLS.ARHITEKTONSKI',
      'SCHOOLS.TMF',
      'SCHOOLS.MAŠINSKI'
    ]).subscribe(translations => {
      this.contactLines = [
        `root@terminal:~$ ${translations['SCHOOLS.ETF']} - <span class="copyable" data-email="plenum@etf.rs">plenum@etf.rs</span>`,
        `root@terminal:~$ ${translations['SCHOOLS.GRAĐEVINSKI']} - <span class="copyable" data-email="grfblokada@gmail.com">grfblokada@gmail.com</span>`,
        `root@terminal:~$ ${translations['SCHOOLS.ARHITEKTONSKI']} - <span class="copyable" data-email="studenti.arhitekture.bg@edu.arh.bg.ac.rs">studenti.arhitekture.bg@edu.arh.bg.ac.rs</span>`,
        `root@terminal:~$ ${translations['SCHOOLS.TMF']} - <span class="copyable" data-email="tmf.bl0kada24@gmail.com">tmf.bl0kada24@gmail.com</span>`,
        `root@terminal:~$ ${translations['SCHOOLS.MAŠINSKI']} - <span class="copyable" data-email="masinskiplenum@gmail.com">masinskiplenum@gmail.com</span>`,
        'root@terminal:~$ '
      ];
      this.typeText(); // Start typing after translations are loaded
    });
  }

  ngAfterViewChecked(): void {
    if (this.isTypingFinished) {
      this.attachClickHandlers();
    }
  }

  typeText(): void {
    if (this.lineIndex < this.contactLines.length) {
      if (this.charIndex < this.contactLines[this.lineIndex].length) {
        this.displayText += this.contactLines[this.lineIndex][this.charIndex];
        this.charIndex++;
        setTimeout(() => this.typeText(), 2);
      } else {
        this.displayText += "\n";
        this.lineIndex++;
        this.charIndex = 0;
        setTimeout(() => this.typeText(), 10);
      }
    } else {
      // Typing finished: show cursor and mark finished
      this.cursorVisible = true;
      this.isTypingFinished = true;
      this.attachClickHandlers();
    }
  }

  attachClickHandlers(): void {
    if (this.isTypingFinished) {
      const copyableSpans = this.elRef.nativeElement.querySelectorAll('.copyable:not([data-listener-added])');

      copyableSpans.forEach((span: HTMLElement) => {
        const email = span.innerText.trim();
        this.renderer.setAttribute(span, 'data-listener-added', 'true');
        this.renderer.listen(span, 'click', () => this.copyToClipboard(email));
        this.renderer.setStyle(span, 'cursor', 'pointer');
        this.renderer.setStyle(span, 'text-decoration', 'underline');
      });
      // Reset flag so new listeners are not added repeatedly
      this.isTypingFinished = false;
    }
  }

  // Updated method: Instead of using alert(), show a custom modal with animations.
  copyToClipboard(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      this.showModal(`📋 Kopirano: ${email}`);
    }).catch(err => {
      console.error('Failed to copy email:', err);
      this.showModal('Failed to copy text.');
    });
  }

  // Display the modal with the given message and auto-hide after 2 seconds.
  showModal(message: string): void {
    this.modalMessage = message;
    this.modalVisible = true;
    // Clear any previous timeout to avoid conflicts
    if (this.modalTimeout) {
      clearTimeout(this.modalTimeout);
    }
    this.modalTimeout = setTimeout(() => {
      this.hideModal();
      this.cdr.detectChanges(); // Ensure the view updates
    }, 2000);
  }

  // Hide the modal (also called when clicking outside the modal content)
  hideModal(): void {
    this.modalVisible = false;
  }

  toggleCursorVisibility(): void {
    const cursorElement = this.elRef.nativeElement.querySelector('.cursor');
    if (cursorElement) {
      if (this.cursorVisible) {
        cursorElement.classList.add('visible');
      } else {
        cursorElement.classList.remove('visible');
      }
    }
  }
}
