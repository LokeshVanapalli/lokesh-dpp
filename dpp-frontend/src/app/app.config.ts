// import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes)
//   ]
// };


import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AppComponent } from './app';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';

export function appBootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule, HttpClientModule),
      provideRouter(appRoutes),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
  }).catch(err => console.error(err));
}
