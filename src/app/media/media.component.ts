import { Component, AfterViewInit, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component'; // Ensure correct path

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  instagramProfiles = [
    { username: 'etfublokadi' },
    { username: 'grf.blokade' },
    { username: 'blokada.arh.bg' },
    { username: 'masinci.u.blokadi' },
    { username: 'tmf.blokada' }
  ];

  images = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);
  currentImageIndex = 0;
  mediaLoading = true; // Flag to control media spinner overlay.

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.loadInstagramEmbed();
    this.startImageSlideshow();

    // Hide the loader after a delay
    setTimeout(() => {
      this.mediaLoading = false;
    }, 500);
  }

  loadInstagramEmbed() {
    if ((window as any).instgrm) {
      // If Instagram's script is already loaded, process embeds immediately
      (window as any).instgrm.Embeds.process();
    } else {
      // Load Instagram's embed script dynamically
      const script = this.renderer.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Process embeds after the script is loaded
        (window as any).instgrm.Embeds.process();
      };
      this.renderer.appendChild(document.body, script);
    }
  }

  startImageSlideshow() {
    setInterval(() => {
      const currentImage = this.el.nativeElement.querySelector('.image-slider img');
      if (currentImage) {
        currentImage.classList.add('flash');
        setTimeout(() => {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
          currentImage.classList.remove('flash');
        }, 500);
      }
    }, 3000);
  }
}