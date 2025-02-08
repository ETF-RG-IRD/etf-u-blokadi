import { Component, AfterViewInit, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, AfterViewInit {
  instagramProfiles = [
    { username: 'etfublokadi' },
    { username: 'grf.blokade' },
    { username: 'blokada.arh.bg' },
    { username: 'masinci.u.blokadi' },
    { username: 'tmf.blokada' }
  ];

  images = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);
  currentImageIndex = 0;
  nextImageIndex = 0;
  mediaLoading = true; // start as loading

  // Transition properties for the "rendering bars" effect
  transitioning: boolean = false;
  numberOfBars: number = 10;  // how many horizontal bars (adjust as desired)
  bars: number[] = [];
  // Note: The container height is fixed at 300px so each bar’s height is 300/numberOfBars = 30px

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.loadInstagramEmbed();
    this.shuffleInstagramProfiles();
  }

  ngAfterViewInit() {
    // Process Instagram embeds if available
    this.processInstagramEmbeds();
    this.startImageSlideshow();
  }

  loadInstagramEmbed() {
    if ((window as any).instgrm) {
      this.ngOnLoad();
    } else {
      const script = this.renderer.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      let scriptLoaded = false;
      script.onload = () => {
        if (!scriptLoaded) {
          scriptLoaded = true;
          this.processInstagramEmbeds();
          this.ngOnLoad();
        }
      };
      this.renderer.appendChild(document.body, script);
    }
  }

  processInstagramEmbeds() {
    if ((window as any).instgrm && (window as any).instgrm.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
  }

  ngOnLoad() {
    // Simulate a delay for the loader
    const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    setTimeout(() => {
      this.mediaLoading = false;
    }, delay);
  }

  startImageSlideshow() {
    // Prepare an array of bar indices [0, 1, 2, …]
    this.bars = Array.from({ length: this.numberOfBars }, (_, i) => i);
  
    setInterval(() => {
      // Find the main image element in the template
      const mainImage = this.el.nativeElement.querySelector('.main-image');
  
      // Increase brightness for the flash effect
      if (mainImage) {
        this.renderer.setStyle(mainImage, 'filter', 'brightness(5)');
        // apply tranzition effect
        this.renderer.setStyle(mainImage, 'transition', 'filter 1.3s');
      }
  
      // Determine next image index for the slideshow
      this.nextImageIndex = (this.currentImageIndex + 1) % this.images.length;
      // Start transition (bars rendering effect)
      this.transitioning = true;
  
      // After the transition duration, update the image and reset brightness
      setTimeout(() => {
        this.currentImageIndex = this.nextImageIndex;
        this.transitioning = false;
        if (mainImage) {
          // Restore normal brightness
          this.renderer.setStyle(mainImage, 'filter', 'brightness(1)');
          // remove transition effect
          
        }
      }, 1500);
    }, 3000);
  }

  shuffleInstagramProfiles() {
    // Extract the first profile
    const firstProfile = this.instagramProfiles.shift();

    // Shuffle the remaining profiles
    for (let i = this.instagramProfiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.instagramProfiles[i], this.instagramProfiles[j]] = [this.instagramProfiles[j], this.instagramProfiles[i]];
    }

    // Add the first profile back to the beginning
    this.instagramProfiles.unshift(firstProfile!);
  }
}
