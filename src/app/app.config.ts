import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEspañolPaginatorIntl } from './core/utils/es-paginator-intl';
import { HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(BrowserModule, HttpClientModule),
    { provide: MatPaginatorIntl, useValue: getEspañolPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'es-CO' },
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([errorHandlerInterceptor])),
    provideAnimations()
  ]
};
