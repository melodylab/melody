import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  isContactPage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Normalizamos la ruta para evitar errores
        const url = event.urlAfterRedirects || event.url;
        this.isContactPage = url.startsWith('/contact');
      });
  }
}
