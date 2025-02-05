import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements AfterViewInit {
  instagramProfiles = [
    { username: 'etfublokadi' },
    { username: 'grf.blokade' },
    { username: 'blokada.arh.bg' },
    { username: 'masinci.u.blokadi' },
    { username: 'tmf.blokada' }
  ];

  images = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);
  currentImageIndex = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadInstagramEmbed();
    this.startImageSlideshow();
  }


  /* Loads too slowly. Making it load OnInit, adding delays and checking if it's loaded before attempting to load
     didn't help. Could just be that loading this many embeds is slow. Network tab is reporting some errors
     adding more delays, should be checked.*/
  loadInstagramEmbed() {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = this.renderer.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      script.onload = () => (window as any).instgrm.Embeds.process();
      this.renderer.appendChild(document.body, script);
    }
  }

  startImageSlideshow() {
    setInterval(() => {
      const currentImage = this.el.nativeElement.querySelector('.image-slider img');
      currentImage.classList.add('flash');
      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        currentImage.classList.remove('flash');
      }, 500); // Match the animation duration in CSS
    }, 3000); // Change image every 3 seconds
  }
}
