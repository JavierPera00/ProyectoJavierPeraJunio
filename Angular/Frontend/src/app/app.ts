import { Component, OnInit, signal, inject, NgZone } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Home } from './home/home';
import { Comentario } from "./comentario/comentario";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Comentario, CommonModule, FormsModule, RouterLinkActive, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');

  usuarioNombre: string = 'anónimo';
  mostrarComentarios = false;
  tieneNovedades: boolean = false;

  private router = inject(Router);
  private ngZone = inject(NgZone);

  constructor() {
    (window as any).appRoot = this;
    this.verificarNovedades();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      if (url.startsWith('/noticias') || url.startsWith('/cursos')) {
        this.tieneNovedades = false;
        localStorage.setItem('nuevasNoticiasOCursos', 'false');
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'nuevasNoticiasOCursos') {
        this.ngZone.run(() => {
          this.verificarNovedades();
        });
      }
    });
  }

  ngOnInit(): void {
    try {
      const usuario = localStorage.getItem('usuarioLogueado');
      if (usuario) {
        const parsed = JSON.parse(usuario);
        this.usuarioNombre = parsed?.username || 'anónimo';
      }
    } catch {
      this.usuarioNombre = 'anónimo';
    }
  }

  verificarNovedades(): void {
    const estado = localStorage.getItem('nuevasNoticiasOCursos');
    this.tieneNovedades = estado === 'true';
  }

  marcarComoNovedad(): void {
    localStorage.setItem('nuevasNoticiasOCursos', 'true');
    this.verificarNovedades();
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.usuarioNombre = 'anónimo';
    window.location.href = '/login';
  }

  actualizarUsuario(nombre: string): void {
    this.usuarioNombre = nombre;
  }

  toggleComentarios(): void {
    this.mostrarComentarios = !this.mostrarComentarios;
  }
}
