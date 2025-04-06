import { Component, AfterViewInit, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../layout/loader/loader.component';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, LoaderComponent, SafePipe],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, AfterViewInit, OnDestroy {
  // Sample Instagram profiles for embed
  instagramProfiles = [
    { username: 'etfublokadi' },
    { username: 'grf.blokade' },
    { username: 'blokada.arh.bg' },
    { username: 'masinci.u.blokadi' },
    { username: 'tmf.blokada' }
  ];

  // YouTube profiles for embed
  youtubeChannels = [
    { 
      //channelId: 'UCiAdJ_4BghgjNHWs-bPZJbQ',
      embedUrl: 'https://www.youtube.com/embed/videoseries?list=UUiAdJ_4BghgjNHWs-bPZJbQ' // UC -> UU prefix za uploads playlistu
    }
  ];

  // Twitter profiles for embed
  twitterProfiles = [
    { 
      username: 'etfblokada' 
    }
  ];
  
  // Array of image file names (assumed to be in your assets folder or served appropriately)
  images = Array.from({ length: 10 }, (_, i) => `${i + 1}.jpg`);
  currentImageIndex = 0;
  nextImageIndex = 0;
  mediaLoading = true; // flag for loader

  autoSlideInterval: any; // reference for auto slide interval
  isAnimating = false; // flag to prevent overlapping transitions

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.loadSocialMediaScripts();
    this.shuffleInstagramProfiles();
  }

  ngAfterViewInit() {
    this.processSocialMediaEmbeds();
    // Start auto slide every 3 seconds
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Load the necessary social media scripts
  loadSocialMediaScripts() {
    // Instagram embed script
    if (!(window as any).instgrm) {
      const instaScript = this.renderer.createElement('script');
      instaScript.src = 'https://www.instagram.com/embed.js';
      instaScript.async = true;
      instaScript.defer = true;
      this.renderer.appendChild(document.body, instaScript);
    }
    
    // Twitter embed script
    if (!(window as any).twttr) {
      const twitterScript = this.renderer.createElement('script');
      twitterScript.src = 'https://platform.twitter.com/widgets.js';
      twitterScript.async = true;
      twitterScript.charset = 'utf-8';
      this.renderer.appendChild(document.body, twitterScript);
    }
    
    // Mark all scripts loaded
    this.ngOnLoad();
  }

  // Processing embed elements
  processSocialMediaEmbeds() {
    // Instagram
    if ((window as any).instgrm && (window as any).instgrm.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
    
    // Twitter
    if ((window as any).twttr && (window as any).twttr.widgets) {
      (window as any).twttr.widgets.load();
    }
  }

  // Simulate a delay for the loader
  ngOnLoad() {
    const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    setTimeout(() => {
      this.mediaLoading = false;
    }, delay);
  }

  // Navigate to next image (triggered automatically or by clicking right arrow)
  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.nextImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.performTransition('next');
  }

  // Navigate to previous image (triggered by clicking left arrow)
  previousImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.nextImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.performTransition('prev');
  }

  // Performs the transition animation.
  // Direction is either 'next' (slide left) or 'prev' (slide right)
  performTransition(direction: 'next' | 'prev') {
    const currentImg: HTMLElement = this.el.nativeElement.querySelector('.current-image');
    const nextImg: HTMLImageElement = this.el.nativeElement.querySelector('.next-image');

    // Set next image source
    nextImg.src = this.images[this.nextImageIndex];

    // Remove any previous animation classes
    this.renderer.removeClass(currentImg, 'slide-out-left');
    this.renderer.removeClass(currentImg, 'slide-out-right');
    this.renderer.removeClass(nextImg, 'slide-in-right');
    this.renderer.removeClass(nextImg, 'slide-in-left');

    // Set initial transform for next image based on direction:
    if (direction === 'next') {
      // For a "next" transition, the next image starts off to the right
      this.renderer.setStyle(nextImg, 'transform', 'translateX(100%)');
    } else {
      // For a "prev" transition, the next image starts off to the left
      this.renderer.setStyle(nextImg, 'transform', 'translateX(-100%)');
    }
    // Force reflow so the initial position is applied before starting the animation
    nextImg.getBoundingClientRect();

    // Apply animation classes based on direction
    if (direction === 'next') {
      this.renderer.addClass(currentImg, 'slide-out-left');
      this.renderer.addClass(nextImg, 'slide-in-right');
    } else {
      this.renderer.addClass(currentImg, 'slide-out-right');
      this.renderer.addClass(nextImg, 'slide-in-left');
    }

    // After animation (duration 1s), update the current image and reset classes/styles
    setTimeout(() => {
      this.currentImageIndex = this.nextImageIndex;
      // Update the visible image (current-image element)
      currentImg.setAttribute('src', this.images[this.currentImageIndex]);

      // Reset transform styles
      this.renderer.setStyle(currentImg, 'transform', 'translateX(0)');
      this.renderer.setStyle(nextImg, 'transform', 'translateX(0)');

      // Remove animation classes
      this.renderer.removeClass(currentImg, 'slide-out-left');
      this.renderer.removeClass(currentImg, 'slide-out-right');
      this.renderer.removeClass(nextImg, 'slide-in-right');
      this.renderer.removeClass(nextImg, 'slide-in-left');

      this.isAnimating = false;
    }, 1000);
  }

  // Shuffle Instagram profiles (optional)
  shuffleInstagramProfiles() {
    const firstProfile = this.instagramProfiles.shift();
    for (let i = this.instagramProfiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.instagramProfiles[i], this.instagramProfiles[j]] = [this.instagramProfiles[j], this.instagramProfiles[i]];
    }
    this.instagramProfiles.unshift(firstProfile!);
  }
}
