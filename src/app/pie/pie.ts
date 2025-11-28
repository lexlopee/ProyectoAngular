import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Componente de pie de página de la aplicación.
 *
 * - Se muestra en la parte inferior del layout principal.
 * - Puede incluir enlaces de navegación, información legal o créditos.
 * - Actualmente no define lógica interna, pero se pueden añadir propiedades o métodos según necesidad.
 *
 * @version 1.0.0
 */
@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pie.html',
  styleUrls: ['./pie.css'] // ✅ corregido: debe ser plural
})
export class Pie {
  /**
   * Clase del componente Pie.
   * Por ahora está vacía, pero puede contener propiedades o métodos
   * que se usen en la plantilla `pie.html`.
   */
}
