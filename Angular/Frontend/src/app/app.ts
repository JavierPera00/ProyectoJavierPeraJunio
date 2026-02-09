import { Component, OnInit, signal } from '@angular/core';
import { Home } from './home/home';
import { RouterLink, RouterLinkWithHref, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');

  usuarioNombre: string = 'anónimo'; 

  constructor() {
    (window as any).appRoot = this;
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

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.usuarioNombre = 'anónimo';
    window.location.href = '/login';
  }

  actualizarUsuario(nombre: string): void {
    this.usuarioNombre = nombre;
  }
}