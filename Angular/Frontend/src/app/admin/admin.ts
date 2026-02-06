import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Noticias } from '../noticias/noticias';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.html',
  providers: [DatePipe], 
  styleUrl: './admin.css',
})
export class Admin {
  
// Formulario de nueva noticia
  titulo = '';
  descripcion = '';
  ciudad = '';

  // Lista de noticias
  noticias: any[] = [];
  
  // Lista de usuarios (importante)
  usuarios: any[] = [];

  mensaje = '';

  constructor() {
    this.cargarNoticias();
    this.cargarUsuarios(); // Asegúrate de llamarlo
  }

  async cargarNoticias() {
    try {
      const res = await fetch('http://localhost:8080/api/noticias');
      if (!res.ok) throw new Error('Error al obtener noticias');
      this.noticias = await res.json();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudieron cargar las noticias.';
    }
  }

  async cargarUsuarios() {
    try {
      const res = await fetch('http://localhost:8080/api/usuarios');
      if (!res.ok) throw new Error('Error al obtener usuarios');
      this.usuarios = await res.json();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudieron cargar los usuarios.';
    }
  }

  async agregarNoticia() {
    if (!this.titulo || !this.descripcion || !this.ciudad) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    const nuevaNoticia = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      ciudad: this.ciudad,
      fechaPublicacion: new Date().toISOString(),
      autor: { id: 1 }
    };

    try {
      const res = await fetch('http://localhost:8080/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaNoticia),
      });

      if (!res.ok) {
        this.mensaje = 'Error al agregar la noticia';
        return;
      }

      const noticiaAgregada = await res.json();
      this.noticias.unshift(noticiaAgregada);
      this.titulo = '';
      this.descripcion = '';
      this.ciudad = '';
      this.mensaje = 'Noticia agregada con éxito!';
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo conectar con el servidor.';
    }
  }
}