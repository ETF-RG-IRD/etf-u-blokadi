import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TypewriterComponent } from "./shared/typewriter/typewriter.component";
import { LoaderComponent } from './layout/loader/loader.component';
import { NgxTranslateModule } from './shared/translate/translate.module';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { slideInAnimation } from './app.animation'; // Import your animation trigger
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TypewriterComponent,
    LoaderComponent,
    NgxTranslateModule,
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  @ViewChild('contentSection') contentSection!: ElementRef;

  title = 'etf-u-blokadi';
  loading: boolean = true; // Declare the loading property
  showHero = false;
  showButton = true; // Button visibility control
  buttonVisible = true; // Control the fade-in/out effect

  constructor(private router: Router) {
    // On initial load - spinner
    window.addEventListener('load', () => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        this.loading = false;
      }, delay);
    });

    //
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log("Current URL:", event.url);
        this.showHero = event.url === '/';
      });
  }

  ngAfterViewInit(): void {
    this.observeContentSection();
  }

  observeContentSection(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.buttonVisible = false; // Start fade-out when content section is in view
          } else {
            this.buttonVisible = true; // Start fade-in when content section is out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );

    observer.observe(this.contentSection.nativeElement);
  }

  scrollToSection(): void {
    this.contentSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });

    // Optionally, hide the button when clicked
    this.buttonVisible = false;
  }

  // Determines the animation state from the activated route's data.
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
