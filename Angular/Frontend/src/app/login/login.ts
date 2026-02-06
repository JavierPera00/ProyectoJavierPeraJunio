import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 datosLogin = { email: '', password: '' };
  mensaje = '';

  constructor(private router: Router) {}

  async iniciarSesion(event: Event) {
    event.preventDefault();

    if (!this.datosLogin.email || !this.datosLogin.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    // CASO ADMIN
    if (this.datosLogin.email.toLowerCase() === 'admin' && this.datosLogin.password === 'admin') {
      this.mensaje = 'Bienvenido Administrador';
      localStorage.setItem('usuarioLogueado', JSON.stringify({ username: 'admin', roles: ['ADMIN'] }));
      this.router.navigate(['/admin']);
      return;
    }

    // USUARIOS NORMALES
    try {
      const res = await fetch('http://localhost:8080/api/usuarios');
      if (!res.ok) throw new Error('Servidor no disponible');

      const usuarios = await res.json();
      const usuario = usuarios.find((u: any) => u.email === this.datosLogin.email);

      if (!usuario) {
        this.mensaje = 'No tienes cuenta registrada.';
        return;
      }

      if (usuario.password !== this.datosLogin.password) {
        this.mensaje = 'Contraseña incorrecta.';
        return;
      }

      this.mensaje = `¡Bienvenido ${usuario.username}!`;
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
      this.router.navigate(['/home']);

    } catch (err) {
      console.error(err);
      this.mensaje = 'Error al conectarse al servidor.';
    }
  }
}