import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DemandsComponent } from './features/demands/demands.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { FaqComponent } from './features/faq/faq.component';
import { MediaComponent } from './features/media/media.component';
import { IncidentsComponent } from './features/incidents/incidents.component';
import { ContactComponent } from './features/contact/contact.component';
import { DonationsComponent } from './features/donations/donations.component'; 

export const routes: Routes = [
  { path: '', component: DemandsComponent, data: { animation: 'DemandsPage' } },
  { path: 'donations', component: DonationsComponent, data: { animation: 'DonationsPage' } },
  { path: 'index', component: IndexComponent, data: { animation: 'IndexPage' } },
  { path: 'announcements', component: AnnouncementsComponent, data: { animation: 'AnnouncementsPage' } },
  { path: 'faq', component: FaqComponent, data: { animation: 'FaqPage' } },
  { path: 'media', component: MediaComponent, data: { animation: 'MediaPage' } },
  { path: 'incidents', component: IncidentsComponent, data: { animation: 'IncidentsPage' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } }
];
