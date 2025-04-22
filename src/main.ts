import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { enableProdMode } from '@angular/core';
import { PruebaComponent } from './app/prueba/prueba.component';
import {RouterModule} from '@angular/router';
import { importProvidersFrom } from '@angular/core';



bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    ...(appConfig.providers || [])
  ]
})
  .catch((err) => console.error(err));
