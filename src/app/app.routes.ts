import { Routes } from '@angular/router';

import { Zapatos } from './pages/zapatos/zapatos';
import { Home } from './pages/home/home';
import { Pantalones } from './pages/pantalones/pantalones';
import { Camisetas } from './pages/camisetas/camisetas';
import { Accesorios } from './pages/accesorios/accesorios';
import { Chaquetas } from './pages/chaquetas/chaquetas';
import { Cesta } from './pages/cesta/cesta';
import { SeccionUsuario } from '../app/seccion-usuario/seccion-usuario';

/**
 * Definición de rutas principales de la aplicación.
 *
 * - Cada objeto dentro del array `routes` representa una ruta accesible.
 * - La propiedad `path` define la URL.
 * - La propiedad `component` indica el componente que se renderiza en esa ruta.
 *
 * @example
 * { path: 'zapatos', component: Zapatos } → Renderiza el componente `Zapatos` en `/zapatos`.
 *
 * @version 1.0.0
 */
export const routes: Routes = [
  /** Ruta raíz que carga la página de inicio */
  { path: '', component: Home },

  /** Ruta para la página de zapatos */
  { path: 'zapatos', component: Zapatos },

  /** Ruta para la página de pantalones */
  { path: 'pantalones', component: Pantalones },

  /** Ruta para la página de camisetas */
  { path: 'camisetas', component: Camisetas },

  /** Ruta para la página de accesorios */
  { path: 'accesorios', component: Accesorios },

  /** Ruta para la página de chaquetas */
  { path: 'chaquetas', component: Chaquetas },

  /** Ruta para la página de cesta */
  { path: 'cesta', component: Cesta },

  /** Ruta para la sección de usuario (login/registro) */
  { path: 'seccion-usuario', component: SeccionUsuario }
];
