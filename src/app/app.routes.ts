import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DemandsComponent } from './demands/demands.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { FaqComponent } from './faq/faq.component';
import { MediaComponent } from './media/media.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path: '', component: DemandsComponent},
    {path: 'index', component: IndexComponent},
    {path: 'announcements', component: AnnouncementsComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'media', component: MediaComponent},
    {path: 'incidents', component: IncidentsComponent},
    {path: 'contact', component: ContactComponent}
];
