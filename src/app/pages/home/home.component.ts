import {
  Component, HostListener, TemplateRef, ElementRef,
  ViewChildren, QueryList, OnInit, AfterViewInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type TiltState = { rx: number; ry: number; tz: number };
type SceneKey = 'factory' | 'ai';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('bounceBtn') bounceBtns!: QueryList<ElementRef>;

  // --- Toggle / 3D ---
  scene: SceneKey = (localStorage.getItem('melody.scene') as SceneKey) || 'factory';
  loaded = false;
  can3D = false;

  // Usa embeds distintos para cada escena
  private srcs: Record<SceneKey, string> = {
    factory: 'https://my.spline.design/starterscenecopy-sQg2IB6NO7S46HdHbHixUNXP/',
    ai:      'https://my.spline.design/sceneia-LOxp44bNpvpufUFb4eDgNgl8/'
  };

  safeUrl!: SafeResourceUrl;

  // Copy dinámico por escena (para el lado izquierdo)
  private copyByScene: Record<SceneKey, { title: string; lede: string; cta: string; link: string }> = {
    factory: {
      title: 'Fábrica de software',
      lede:  'Construimos apps y plataformas que crecen contigo: web, móvil e internos.',
      cta:   'Ver servicios',
      link:  '/services'
    },
    ai: {
      title: 'Productos impulsados por IA',
      lede:  'Automatiza, atiende y decide mejor con IA a la medida de tu operación.',
      cta:   'Ver productos',
      link:  '/products'
    }
  };
  get copy() { return this.copyByScene[this.scene]; }

  // ----- resto de tu lógica previa -----
  currentTpl?: TemplateRef<any>; // si es undefined, se usa tplDefault
  tilts: Record<number, TiltState> = {};
  selected: number | null = null;
  cards = [
    { src: 'assets/images/dev1.png',     alt: 'Desarrollo Software' },
    { src: 'assets/images/chatbot1.png', alt: 'Chatbot Básico' },
    { src: 'assets/images/chatbot2.png', alt: 'Chatbot Avanzado' },
    { src: 'assets/images/dev2.png',     alt: 'Desarrollo Personalizado' },
  ];

  private bounceTimer: any = null;

  constructor(private sanitizer: DomSanitizer) {}

  // ---------- Ciclo de vida ----------
  ngOnInit() {
    this.can3D = this.webglAvailable()
      && matchMedia('(prefers-reduced-motion: no-preference)').matches;
    this.updateHoverCapability();
    this.updateSafeUrl();
  }

  ngAfterViewInit() {
    // arranca el brinco aleatorio cuando ya existen los botones
    this.bounceTimer = setInterval(() => {
      const buttons = this.bounceBtns.toArray();
      if (!buttons.length) return;
      const random = Math.floor(Math.random() * buttons.length);
      const el = buttons[random].nativeElement as HTMLElement;
      el.classList.remove('bounce-once');
      void el.offsetWidth;
      el.classList.add('bounce-once');
    }, 4000);
  }

  ngOnDestroy() {
    clearInterval(this.bounceTimer);
    clearTimeout(this.hoverTimer);
  }

  // ---------- Toggle de escena ----------
  toggleScene() {
    this.setScene(this.scene === 'factory' ? 'ai' : 'factory');
  }

  setScene(s: SceneKey) {
    if (this.scene === s) return;
    this.scene = s;
    localStorage.setItem('melody.scene', this.scene);
    this.loaded = false;
    this.updateSafeUrl();
  }

  private buildEmbed(url: string) {
    // Asegura params de embed/autoplay aunque pegues un link sin query
    return url.includes('?')
      ? `${url}&embed=1&autoplay=1`
      : `${url}?embed=1&autoplay=1`;
  }

  private updateSafeUrl() {
    const url = this.buildEmbed(this.srcs[this.scene]);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private webglAvailable(): boolean {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch { return false; }
  }

  // ---------- Anim / tilt tarjetas legacy ----------
  randomBounce(el: HTMLElement) {
    el.classList.remove('bounce-once');
    void el.offsetWidth;
    el.classList.add('bounce-once');
  }

  onCardMove(event: MouseEvent, i: number) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;   // 0..1
    const py = (event.clientY - rect.top) / rect.height;   // 0..1
    const ry = (px - 0.5) * 12;   // rotación Y
    const rx = (0.5 - py) * 12;   // rotación X
    this.tilts[i] = { rx, ry, tz: 6 };
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
    el.style.setProperty('--tz', `${this.tilts[i].tz}px`);
  }

  onCardLeave(event: MouseEvent, i: number) {
    const el = event.currentTarget as HTMLElement;
    this.tilts[i] = { rx: 0, ry: 0, tz: 0 };
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
    el.style.setProperty('--tz', `0px`);
  }

  expand(index: number, tplRef: TemplateRef<any>) {
    this.selected = index;
    this.currentTpl = tplRef;
  }

  closeExpanded() {
    clearTimeout(this.hoverTimer);
    this.selected = null;
  }

  /** ---- HOVER CONTROL ---- **/
  canHover = false;
  hoverTimer: any = null;
  hoverOpenDelayMs = 100; // pequeño delay para evitar parpadeos

  @HostListener('window:resize')
  updateHoverCapability() {
    this.canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  hoverExpand(index: number, tplRef: TemplateRef<any>) {
    if (!this.canHover) return;
    clearTimeout(this.hoverTimer);
    this.hoverTimer = setTimeout(() => this.expand(index, tplRef), this.hoverOpenDelayMs);
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeExpanded(); }
}
