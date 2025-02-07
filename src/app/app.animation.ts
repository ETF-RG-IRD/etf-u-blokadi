// route.animations.ts
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    // Query both entering and leaving elements and set them to a fixed position
    query(':enter, :leave', [
      style({
        position: 'fixed',
        width: '100%',
      })
    ], { optional: true }),
    group([
      // Animate the entering element from right to left
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      // Animate the leaving element from its position to the left
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);
