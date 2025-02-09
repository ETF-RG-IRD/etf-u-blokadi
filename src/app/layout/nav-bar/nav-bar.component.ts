import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  siteLangugage = 'Српски';
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
    const currentLanguage = this.translate.currentLang;
    console.log('currentLanguage', currentLanguage);
  }
}