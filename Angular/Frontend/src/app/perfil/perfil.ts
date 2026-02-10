import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PerfilService } from '../services/perfilService';
import { UsuarioModel } from '../model/usuario.model';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule,RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario!: UsuarioModel;
  mensaje = '';

  constructor(private router: Router, private perfilService: PerfilService) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado) as UsuarioModel;

      // Verificar que tenga ID
      if (!this.usuario.id) {
        console.error('El usuario logueado no tiene ID. No se puede actualizar.');
        this.mensaje = 'Error: usuario inválido';
        this.router.navigate(['/login']);
        return;
      }
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

  guardarCambios() {
    // Validación básica
    if (!this.usuario.username || !this.usuario.email) {
      this.mensaje = 'Username y Email son obligatorios';
      return;
    }

    if (!this.usuario.id) {
      this.mensaje = 'Error: No se puede actualizar sin ID';
      return;
    }

    // Enviar PUT al backend usando el ID existente
    this.perfilService.actualizarUsuario(this.usuario).subscribe({
      next: (actualizado: UsuarioModel) => {
        // Actualizar localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(actualizado));
        this.mensaje = 'Datos actualizados correctamente';
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        this.mensaje = 'Error al conectarse al servidor';
      },
    });
  }
}