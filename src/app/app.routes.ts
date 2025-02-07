import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DemandsComponent } from './demands/demands.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { FaqComponent } from './faq/faq.component';
import { MediaComponent } from './media/media.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: DemandsComponent, data: { animation: 'DemandsPage' } },
  { path: 'index', component: IndexComponent, data: { animation: 'IndexPage' } },
  { path: 'announcements', component: AnnouncementsComponent, data: { animation: 'AnnouncementsPage' } },
  { path: 'faq', component: FaqComponent, data: { animation: 'FaqPage' } },
  { path: 'media', component: MediaComponent, data: { animation: 'MediaPage' } },
  { path: 'incidents', component: IncidentsComponent, data: { animation: 'IncidentsPage' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } }
];
