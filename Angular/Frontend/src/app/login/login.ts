import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  encapsulation: ViewEncapsulation.None
})
export class Login {
  username = '';
  password = '';
  error = '';
  cargando = false;
  mostrarPass = false;

  constructor(private router: Router) {}

  login() {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Introduce usuario y contraseña';
      return;
    }

    this.cargando = true;

    setTimeout(() => {
      if (this.username === 'admin' && this.password === 'admin1234') {
        localStorage.setItem('usuarioLogueado', JSON.stringify({
          username: 'admin',
          rol: 'admin'
        }));
        this.router.navigate(['/adminn']);
      } else {
        this.error = 'Usuario o contraseña incorrectos';
        this.cargando = false;
      }
    }, 800);
  }
}
