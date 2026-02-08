import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule,RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  usuario: any = {
      username: '',
      email: '',
      password: ''
  };

  mensaje = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    } else {
      // Si no hay usuario logueado, redirige al login
      this.router.navigate(['/login']);
    }
  }

  async guardarCambios() {
    if (!this.usuario.username || !this.usuario.email || !this.usuario.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${this.usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.usuario)
      });

      if (!response.ok) {
        this.mensaje = 'Error al guardar los cambios';
        return;
      }

      const actualizado = await response.json();
      localStorage.setItem('usuarioLogueado', JSON.stringify(actualizado));
      this.mensaje = 'Datos actualizados correctamente';
    } catch (error) {
      console.error(error);
      this.mensaje = 'Error al conectarse al servidor';
    }
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.usuario = null;
    this.router.navigate(['/login']);
}

}
