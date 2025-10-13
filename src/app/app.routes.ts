import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout/layout.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { ServicesComponent } from '@app/pages/services/services.component';
import { AboutComponent } from '@app/pages/about/about.component';
import { ContactComponent } from '@app/pages/contact/contact.component';

// Importar los nuevos componentes de detalle
import { DesarrolloArquitecturaComponent } from '@app/pages/services/desarrollo-arquitectura/desarrollo-arquitectura.component';
import { AutomatizacionConectividadComponent } from '@app/pages/services/automatizacion-conectividad/automatizacion-conectividad.component';
import { ConsultoriaMigracionComponent } from '@app/pages/services/consultoria-migracion/consultoria-migracion.component';
import { ExtensionEquipoComponent } from '@app/pages/services/extension-equipo/extension-equipo.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'services/desarrollo-arquitectura', component: DesarrolloArquitecturaComponent },
      { path: 'services/automatizacion-conectividad', component: AutomatizacionConectividadComponent },
      { path: 'services/consultoria-migracion', component: ConsultoriaMigracionComponent },
      { path: 'services/extension-equipo', component: ExtensionEquipoComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
