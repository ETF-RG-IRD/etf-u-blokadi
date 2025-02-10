import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TypewriterComponent } from "./shared/typewriter/typewriter.component";
import { LoaderComponent } from './layout/loader/loader.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { slideInAnimation } from './app.animation'; // Import your animation trigger
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TypewriterComponent,
    LoaderComponent,
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

  constructor(private router: Router, private translate: TranslateService) {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      this.translate.setDefaultLang(savedLang);
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang('sr-cyr');
      this.translate.use('sr-cyr');
      localStorage.setItem('selectedLanguage', 'sr-cyr'); // Ensure it's stored
    }


    // On initial load - spinner
    window.addEventListener('load', () => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        this.loading = false;
      }, delay);
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log("Current URL:", event.url);
        this.showHero = event.url === '/';
      });
  }

  gOnInit(): void {
    // Load the language from localStorage (or use default)

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
