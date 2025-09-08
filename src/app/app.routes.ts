import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout/layout.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { ServicesComponent } from '@app/pages/services/services.component';
import { AboutComponent } from '@app/pages/about/about.component';
import { ContactComponent } from '@app/pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent }
    ],
  },
  { path: '**', redirectTo: '' },
    
];
