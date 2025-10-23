import { Component, AfterViewInit } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-automatizacion-conectividad',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './automatizacion-conectividad.component.html',
  styleUrl: './automatizacion-conectividad.component.css'
})
export class AutomatizacionConectividadComponent implements AfterViewInit {
  ngAfterViewInit() {
    const logos = document.querySelectorAll('.carousel-diagonal .logo');
    let current = 0;

    setInterval(() => {
      const next = (current + 1) % logos.length;
      logos[current].classList.remove('active');
      logos[current].classList.add('fade-out');

      logos[next].classList.add('active');
      logos[next].classList.remove('fade-out');

      current = next;
    }, 2500);
  }

}
