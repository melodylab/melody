import { Component, AfterViewInit } from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-extension-equipo',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './extension-equipo.component.html',
  styleUrl: './extension-equipo.component.css'
})
export class ExtensionEquipoComponent implements AfterViewInit {
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
