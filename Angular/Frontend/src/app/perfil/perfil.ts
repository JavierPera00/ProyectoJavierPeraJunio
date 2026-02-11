import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PerfilService } from '../services/perfilService';
import { RolModel, UsuarioModel } from '../model/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  usuario!: UsuarioModel;
  mensaje = '';
  nuevaPassword = '';
  mostrarPassword = false;

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  constructor(private router: Router, private perfilService: PerfilService) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    console.log('Usuario guardado en localStorage:', usuarioGuardado);

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado) as UsuarioModel;

      if (!this.usuario.id) {
        console.error('El usuario logueado no tiene ID. No se puede actualizar.');
        this.mensaje = 'Error: usuario inválido';
        this.router.navigate(['/login']);
        return;
      }
  
      this.nuevaPassword = this.usuario.password || '';

      if (!this.usuario.rol) {
        this.usuario.rol = { nombre: 'USER' };
      }
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

  guardarCambios() {
  if (!this.usuario.username || !this.usuario.email) {
    this.mensaje = 'Username y Email son obligatorios';
    return;
  }

  if (!this.usuario.id) {
    this.mensaje = 'Error: No se puede actualizar sin ID';
    return;
  }

  if (this.nuevaPassword) {
    this.usuario.password = this.nuevaPassword;
  }
  
  this.perfilService.actualizarUsuario(this.usuario).subscribe({
    next: (actualizado: UsuarioModel) => {
      // Guardar cambios en localStorage
      localStorage.setItem('usuarioLogueado', JSON.stringify(actualizado));
      this.mensaje = 'Datos actualizados correctamente';
      this.nuevaPassword = '';
    },
    error: (err) => {
      console.error('Error al actualizar usuario:', err);
      this.mensaje = 'Error al conectarse al servidor';
    },
  });
}
}