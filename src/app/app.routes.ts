import { Routes } from '@angular/router';

import { Zapatos } from './pages/zapatos/zapatos';
import { Home } from './pages/home/home';
import { Pantalones } from './pages/pantalones/pantalones';
import { Camisetas } from './pages/camisetas/camisetas';
import { Accesorios } from './pages/accesorios/accesorios';
import { Chaquetas } from './pages/chaquetas/chaquetas';
import { Cesta } from './pages/cesta/cesta';
import { SeccionUsuario } from '../app/seccion-usuario/seccion-usuario';
import { BuscadorComponent } from './pages/buscador/buscador';

export const routes: Routes = [
  { path: '',              component: Home },
  { path: 'zapatos',       component: Zapatos },
  { path: 'pantalones',    component: Pantalones },
  { path: 'camisetas',     component: Camisetas },
  { path: 'accesorios',    component: Accesorios },
  { path: 'chaquetas',     component: Chaquetas },
  { path: 'cesta',         component: Cesta },
  { path: 'seccion-usuario', component: SeccionUsuario },
  { path: 'buscador',      component: BuscadorComponent },
  { path: 'pantalones/:id', component: Pantalones },
  { path: 'camisetas/:id',  component: Camisetas },
  { path: 'zapatos/:id',    component: Zapatos },
  { path: 'accesorios/:id', component: Accesorios },
  /* Ruta wildcard — cualquier URL desconocida redirige al inicio */
  { path: '**', redirectTo: '', pathMatch: 'full' }
];