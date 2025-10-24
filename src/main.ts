import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import {
  LucideAngularModule,
  Linkedin,
  Github,
  Mail,
  Sun,
  Moon,
  Heart,
  Sparkles,
  Users,
  CheckCircle,
  ServerCog,
  Workflow,
  LineChart,
  Layers,
  Cpu,
  Network,
  TrendingUp,
  Clock,
  ShieldCheck,
  Brain,
  ArrowLeft,
  Bot,
  CpuIcon,
  Target,
  ChartLine,
  Handshake,
  MessageCircle,
  Briefcase,
  Star,
} from 'lucide-angular';
import { provideRouter } from '@angular/router';

// 🚀 Bootstrap principal
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    importProvidersFrom(
      LucideAngularModule.pick({
        // Íconos globales que usará Melody
        Linkedin,
        Github,
        Mail,
        Sun,
        Moon,
        Heart,
        Sparkles,
        Users,
        CheckCircle,
        ServerCog,
        Workflow,
        LineChart,
        Layers,
        Cpu,
        Network,
        TrendingUp,
        Clock,
        ShieldCheck,
        Brain,
        ArrowLeft,
        Bot,
        CpuIcon,
        Target,
        ChartLine,
        Handshake,
        MessageCircle,
        Briefcase,
        Star,
      })
    ),
    ...appConfig.providers!, // Mantiene tu configuración base
  ],
})
  .then(() => {
    // 🎬 Control del splash
    const splash = document.getElementById('splash');
    if (splash) {
      setTimeout(() => {
        splash.classList.add('splash-hide');
        setTimeout(() => splash.remove(), 300);
      }, 1500);
    }
  })
  .catch((err) => console.error(err));
