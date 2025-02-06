import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TypewriterComponent } from "./typewriter/typewriter.component";
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TypewriterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'etf-u-blokadi';
  loading = true;

  constructor(private router: Router) {
    // Initial load delay
    window.addEventListener('load', () => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        this.loading = false;
      }, delay);
    });

    // Listen to route events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
        setTimeout(() => {
          this.loading = false;
        }, delay);
      }
    });
  }
}