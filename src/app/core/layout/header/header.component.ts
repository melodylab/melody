import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Event, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  open = false;
  private sub!: Subscription;

  constructor(private router: Router) {}

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
