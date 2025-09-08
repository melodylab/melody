import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { filter, take } from 'rxjs/operators';

//splash control
bootstrapApplication(AppComponent)
  .then(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      // espera 3000 ms (3s) antes de ocultar
      setTimeout(() => {
        splash.classList.add('splash-hide');
        setTimeout(() => splash.remove(), 300); // remueve tras animación
      }, 1500);
    }
  })
  .catch(err => console.error(err));


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
