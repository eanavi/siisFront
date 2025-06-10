import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { autenticacionIterceptorFn } from '@nucleo/interceptores/autenticacion.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { SesionServicio } from '@compartido/servicios/sesion.servicio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([autenticacionIterceptorFn])),
    provideAnimationsAsync()
  ]
};
