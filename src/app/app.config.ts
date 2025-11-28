import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación Angular.
 *
 * - Define los proveedores globales que estarán disponibles en toda la aplicación.
 * - Incluye manejo de errores globales, optimización de detección de cambios y configuración de rutas.
 *
 * @version 1.0.0
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor para escuchar y manejar errores globales del navegador.
     * Permite capturar excepciones no controladas y errores de eventos.
     */
    provideBrowserGlobalErrorListeners(),

    /**
     * Proveedor para configurar la detección de cambios de Angular.
     * La opción `eventCoalescing: true` agrupa múltiples eventos en una sola verificación,
     * mejorando el rendimiento de la aplicación.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor del enrutador principal de la aplicación.
     * Se basa en las rutas definidas en `app.routes.ts`.
     */
    provideRouter(routes)
  ]
};
