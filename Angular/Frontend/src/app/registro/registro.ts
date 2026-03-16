import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioModel } from '../model/usuario.model';
import { RegistroService } from '../services/registroService';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  datosUsuario = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  mensaje = '';

  constructor(private router: Router,private registroService: RegistroService ) {}

  registrar(event: Event) {
    event.preventDefault();

    if (
      !this.datosUsuario.username ||
      !this.datosUsuario.email ||
      !this.datosUsuario.password ||
      !this.datosUsuario.confirmPassword
    ) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }
    if (this.datosUsuario.password !== this.datosUsuario.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    const nuevoUsuario: UsuarioModel = {
      username: this.datosUsuario.username,
      email: this.datosUsuario.email,
      password: this.datosUsuario.password,
    };

    this.registroService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.mensaje = '¡Usuario registrado con éxito!';
        this.resetForm();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al registrar usuario. Revisa los datos.';
      },
    });
  }

  resetForm() {
    this.datosUsuario = { username: '', email: '', password: '', confirmPassword: '' };
  }
}
