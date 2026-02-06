import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [RouterLink,FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  datosUsuario = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  mensaje = '';

  constructor(private router: Router) {}

  async registrar(event: Event) {
    event.preventDefault(); 

    // Validaciones básicas
    if (!this.datosUsuario.username || !this.datosUsuario.email || !this.datosUsuario.password || !this.datosUsuario.confirmPassword) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }
    if (this.datosUsuario.password !== this.datosUsuario.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }
    const nuevoUsuario = {
      username: this.datosUsuario.username,
      email: this.datosUsuario.email,
      password: this.datosUsuario.password
    };

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      if (response.ok) {
        this.mensaje = '¡Usuario registrado con éxito!';
        this.resetForm();

        // Redirigir al login 1sm dps
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      } else {
        this.mensaje = 'Error en el registro. Revisa los datos.';
      }
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo conectar con la Base deDatos.';
    }
  }
  resetForm() {
    this.datosUsuario = { username: '', email: '', password: '', confirmPassword: '' };
  }
}