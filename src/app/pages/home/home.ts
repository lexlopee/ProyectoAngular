import { Component } from '@angular/core';

/**
 * Componente principal de la página de inicio.
 *
 * - Se muestra al acceder a la ruta raíz de la aplicación.
 * - Puede contener información de bienvenida, destacados o navegación inicial.
 * - Actualmente no define lógica interna, pero se pueden añadir propiedades o métodos según necesidad.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] // ✅ corregido: debe ser plural
})
export class Home {
  /**
   * Clase del componente Home.
   * Por ahora está vacía, pero puede contener propiedades o métodos
   * que se usen en la plantilla `home.html`.
   */
}
