import { Component, ChangeDetectorRef, ElementRef, Renderer2, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Add this import

@Component({
  selector: 'app-contact',
  standalone: true, // Add this if using standalone components
  imports: [CommonModule], // Add this line to import CommonModule
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation: ViewEncapsulation.None // Ensures CSS works on dynamically added elements
})
export class ContactComponent implements AfterViewChecked {
  contactLines: string[] = [
    'root@terminal:~$ <span class="copyable" data-email="plenum@etf.rs">plenum@etf.rs</span>',
    'root@terminal:~$ <span class="copyable" data-email="tmf.bl0kada24@gmail.com">tmf.bl0kada24@gmail.com</span>',
    'root@terminal:~$ <span class="copyable" data-email="studenti.arhitekture.bg@edu.arh.bg.ac.rs">studenti.arhitekture.bg@edu.arh.bg.ac.rs</span>',
    'root@terminal:~$ Website: www.johndoe.dev',
    'root@terminal:~$'
  ];
  
  displayText: SafeHtml = "";
  cursorVisible: boolean = false;  // Set cursor visibility to false initially
  private lineIndex = 0;
  private charIndex = 0;
  private isTypingFinished = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {
    this.typeText();
    setInterval(() => {
      this.cdr.detectChanges();
      this.toggleCursorVisibility(); // Toggle cursor visibility based on cursorVisible
    }, 500);
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
        setTimeout(() => this.typeText(), 10);
      } else {
        this.displayText += "\n";
        this.lineIndex++;
        this.charIndex = 0;
        setTimeout(() => this.typeText(), 50);
      }
    } else {
      // Typing finished: show cursor and attach click handlers
      this.cursorVisible = true;
      this.attachClickHandlers();
    }
  }

 // contact.component.ts (updated)
 attachClickHandlers(): void {
  if (this.isTypingFinished) {
    // Get all copyable spans that don't have listeners yet
    const copyableSpans = this.elRef.nativeElement.querySelectorAll('.copyable:not([data-listener-added])');
    
    copyableSpans.forEach((span: HTMLElement) => {
      const email = span.innerText.trim();
      this.renderer.setAttribute(span, 'data-listener-added', 'true');
      this.renderer.listen(span, 'click', () => this.copyToClipboard(email));
      
      // Add hover effects
      this.renderer.setStyle(span, 'cursor', 'pointer');
      this.renderer.setStyle(span, 'text-decoration', 'underline');
    });
    this.isTypingFinished = false;
  }
}
  copyToClipboard(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      alert(`📋 Copied: ${email}`);
    }).catch(err => {
      console.error('Failed to copy email:', err);
    });
  }

  // Function to toggle cursor visibility
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
