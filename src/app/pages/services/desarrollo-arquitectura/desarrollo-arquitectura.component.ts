import { Component, AfterViewInit } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-desarrollo-arquitectura',
  standalone: true,
  templateUrl: './desarrollo-arquitectura.component.html',
  styleUrls: ['./desarrollo-arquitectura.component.css'],
  imports: [
    LucideAngularModule,
    RouterLink
  ]
})
export class DesarrolloArquitecturaComponent implements AfterViewInit {
  ngAfterViewInit() {
    const logos = document.querySelectorAll<HTMLImageElement>('.carousel-diagonal .logo');
    let current = 0;

    setInterval(() => {
      logos[current].classList.remove('active');
      logos[current].classList.add('fade-out');

      current = (current + 1) % logos.length;

      logos.forEach((logo, i) => {
        if (i !== current) logo.classList.remove('fade-out');
      });

      logos[current].classList.add('active');
    }, 1500); // cambia cada 3 segundos
  }
}
