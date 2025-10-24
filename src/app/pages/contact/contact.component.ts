import { Component, AfterViewInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit() {
    const logos = document.querySelectorAll('.carousel-diagonal .logo');
    let current = 0;

    const startCarousel = () => {
      setInterval(() => {
        const next = (current + 1) % logos.length;
        logos[current].classList.remove('active');
        logos[current].classList.add('fade-out');

        logos[next].classList.add('active');
        logos[next].classList.remove('fade-out');

        current = next;
      }, 2500);
    };

    let loaded = 0;
    logos.forEach((img: any) => {
      if (img.complete) loaded++;
      else img.onload = () => {
        loaded++;
        if (loaded === logos.length) startCarousel();
      };
    });

    if (loaded === logos.length) startCarousel();
  }
}
