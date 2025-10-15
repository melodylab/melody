import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  open = false;
  private sub!: Subscription;
  isDarkMode = false;
  constructor(private router: Router) {}
  isServicesOpen = false;

  toggleServices() {
    this.isServicesOpen = !this.isServicesOpen;
  }

  closeDropdown() {
    this.isServicesOpen = false;
  }

// Se cierra si el usuario hace clic fuera del menú
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isServicesOpen = false;
    }
  }



  ngOnInit(): void {
    this.sub = this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) this.close();
    });
  }

  toggle() {
    this.open = !this.open;
    this.applyGlobalOverlay(this.open);
  }

  close() {
    this.open = false;
    this.applyGlobalOverlay(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.close(); }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    this.applyGlobalOverlay(false);
  }

  private applyGlobalOverlay(enabled: boolean) {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add('menu-open');
    } else {
      html.classList.remove('menu-open');
    }
  }
}
