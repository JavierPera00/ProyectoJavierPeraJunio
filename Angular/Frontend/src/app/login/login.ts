import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  datosLogin = { username: '', password: '' };
  mensaje = '';

  constructor(private router: Router) {}

  async iniciarSesion(event: Event) {
    event.preventDefault();
    this.mensaje = '';
    if (!this.datosLogin.username || !this.datosLogin.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.datosLogin),
      });
      if (!res.ok) {
        const errorMsg = await res.text();
        this.mensaje = errorMsg || 'Error al iniciar sesión';
        return;
      }
      const usuario = await res.json();
      // Guardar usuario
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

      const appComp = (window as any).appRoot as any;
      if (appComp?.actualizarUsuario) {
        appComp.actualizarUsuario(usuario.username);
      }
      this.mensaje = `¡Bienvenido ${usuario.username}!`;
      if (usuario.rol === 'ADMIN') {
        await this.router.navigateByUrl('/adminn');
      } else {
        await this.router.navigate(['/home']);
      }
    } catch (err) {
      console.error('Error al conectarse al servidor:', err);
      this.mensaje = 'Error al conectarse al servidor.';
      localStorage.removeItem('usuarioLogueado');
    }
  }
}
