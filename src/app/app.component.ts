import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TypewriterComponent } from "./typewriter/typewriter.component";
import { LoaderComponent } from './loader/loader.component';
import { slideInAnimation } from './app.animation'; // Import your animation trigger
import "leaflet/dist/leaflet.css"
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TypewriterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'etf-u-blokadi';
  loading: boolean = true; // Declare the loading property

  constructor(private router: Router) {
    // On initial load - spinner
    window.addEventListener('load', () => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        this.loading = false;
      }, delay);
    });
  }

  // Determines the animation state from the activated route's data.
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}