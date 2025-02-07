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
  mediaLoading = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.loadInstagramEmbed();
  }

  ngAfterViewInit() {
    this.startImageSlideshow();
  }

  loadInstagramEmbed() {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
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
          (window as any).instgrm.Embeds.process();
          this.ngOnLoad();
        }
      };
      this.renderer.appendChild(document.body, script);
    }
  }

  ngOnLoad() {
    const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    setTimeout(() => {
      this.mediaLoading = false;
    }, delay);
  }

  startImageSlideshow() {
    setInterval(() => {
      const currentImage = this.el.nativeElement.querySelector('.image-slider img');
      currentImage.classList.add('flash');
      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        currentImage.classList.remove('flash');
      }, 500);
    }, 3000);
  }
}