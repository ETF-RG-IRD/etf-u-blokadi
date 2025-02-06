import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wip',
  imports: [CommonModule],
  templateUrl: './wip.component.html',
  styleUrl: './wip.component.css'
})
export class WipComponent {
  progress: number;

  constructor() {
    this.progress = this.getRandomProgress();
  }

  ngOnInit(): void { }

  getRandomProgress(): number {
    return Math.floor(Math.random() * 21) + 50; // Random number between 50 and 100
  }
}
