import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  animations: [
    // Apply cascade animation to the whole container
    trigger('listAnimation', [
      transition(':enter', [
        query('*', [
          // Start all child elements slightly above with zero opacity.
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          // Each child starts its animation 100ms after the previous one.
          stagger(40, [
            animate(
              '100ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class NavBarComponent {
  siteLangugage = 'Српски';
  navDropdownOpen = false;
  langDropdownOpen = false;
  languageList = [
    { code: 'sr-cyr', label: 'Српски' },
    { code: 'sr-lat', label: 'Srpski' },
  ];

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('selectedLanguage') || 'sr-cyr';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
    this.siteLangugage = this.languageList.find(lang => lang.code === savedLang)?.label || 'Српски';
  }

  toggleLangDropdown(): void {
    this.langDropdownOpen = !this.langDropdownOpen;
  }

  toggleNavDropdown(): void {
    this.navDropdownOpen = !this.navDropdownOpen;
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLangugage = selectedLanguage;
      this.translate.use(localeCode).subscribe(() => {
        localStorage.setItem('selectedLanguage', localeCode);
        window.location.reload();
      });
    }
    this.langDropdownOpen = false;
    console.log('currentLanguage', this.translate.currentLang);
  }
}
