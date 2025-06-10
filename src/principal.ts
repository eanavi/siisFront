import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.configuracion';
import { AppComponent } from './app/app.componente';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
