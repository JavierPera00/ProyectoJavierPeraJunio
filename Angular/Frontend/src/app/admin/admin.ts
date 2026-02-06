import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Noticias } from '../noticias/noticias';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule,RouterLink,DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  
// Formulario de nueva noticia
  titulo = '';
  descripcion = '';
  ciudad = '';

  // Lista de noticias cargadas desde backend
  noticias: any[] = [];

  mensaje = '';

  constructor(private datePipe: DatePipe) {
    this.cargarNoticias();
  }

  // Cargar noticias desde backend
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

  // Crear noticia nueva
  async agregarNoticia() {
    if (!this.titulo || !this.descripcion || !this.ciudad) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    const nuevaNoticia = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      ciudad: this.ciudad,
      fechaPublicacion: new Date().toISOString(), // fecha actual
      autor: { id: 1 } // admin con id 1, ajusta según tu backend
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
      this.noticias.unshift(noticiaAgregada); // actualizar lista
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