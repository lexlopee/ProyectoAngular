import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CestaService } from '../services/cesta.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { BuscadorComponent } from '../pages/buscador/buscador';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule, CommonModule, BuscadorComponent],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera implements OnInit, OnDestroy {

  private cestaService = inject(CestaService);
  private usuarioService = inject(UsuarioService);

  usuario: string | null = null;
  cantidadCesta: number = 0;

  private menuToggle!: HTMLElement;
  private menuNav!: HTMLElement;
  private clickFuera!: (e: MouseEvent) => void;

  ngOnInit(): void {
    this.actualizarUsuarioYCesta();

    window.addEventListener('actualizarCestaCabecera', (e: any) => {
      this.cantidadCesta = e.detail;
    });

    window.addEventListener('usuarioLogueado', () => {
      this.actualizarUsuarioYCesta();
    });

    window.addEventListener('usuarioCerrado', () => {
      this.usuario = null;
      this.cantidadCesta = 0;
    });

    setTimeout(() => this.setupMenu(), 0);
  }

  ngOnDestroy(): void {
    if (this.menuToggle) {
      this.menuToggle.removeEventListener('click', this.toggleMenu.bind(this));
    }
    document.removeEventListener('click', this.clickFuera);
  }

  private setupMenu(): void {
    this.menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
    this.menuNav = document.querySelector('#menu-principal') as HTMLElement;

    if (!this.menuToggle || !this.menuNav) return;

    this.menuToggle.addEventListener('click', () => this.toggleMenu());

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.menuNav.classList.contains('show')) {
        this.cerrarMenu();
        this.menuToggle.focus();
      }
    });

    this.clickFuera = (e: MouseEvent) => {
      if (!this.menuToggle.contains(e.target as Node) && !this.menuNav.contains(e.target as Node)) {
        this.cerrarMenu();
      }
    };
    document.addEventListener('click', this.clickFuera);

    this.menuNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => this.cerrarMenu());
    });
  }

  private toggleMenu(): void {
    const expanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
    expanded ? this.cerrarMenu() : this.abrirMenu();
  }

  private abrirMenu(): void {
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.menuNav.classList.add('show');
    document.body.classList.add('menu-open');
  }

  private cerrarMenu(): void {
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuNav.classList.remove('show');
    document.body.classList.remove('menu-open');
  }

  actualizarUsuarioYCesta(): void {
    const usuarioActual = this.usuarioService.getUsuarioActual();
    if (usuarioActual) {
      this.usuario = usuarioActual.nombre;
      this.cantidadCesta = this.cestaService.getProductos().length;
    }
  }

  cerrarSesion(): void {
    this.usuarioService.logout();
    this.usuario = null;
    this.cantidadCesta = 0;
    window.dispatchEvent(new CustomEvent('usuarioCerrado'));
    window.location.href = '/';
  }
}