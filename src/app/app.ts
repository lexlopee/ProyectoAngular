import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cabecera } from "./cabecera/cabecera";
import { Pie } from "./pie/pie";

/**
 * Componente principal de la aplicación.
 *
 * - Define el layout general de la aplicación.
 * - Incluye la cabecera y el pie de página.
 * - Maneja la inicialización y la navegación principal.
 *
 * @author Alejandro
 * @version 1.0.0
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Cabecera, Pie],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  /**
   * Título de la aplicación mostrado en la interfaz.
   */
  title: string = 'mi-aplicacion';

  /**
   * Hook de ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarApp();
  }

  /**
   * Lógica de inicialización de la aplicación.
   * Aquí puedes cargar configuraciones, datos iniciales o servicios globales.
   */
  private inicializarApp(): void {
    console.log('Aplicación inicializada');
  }
}
