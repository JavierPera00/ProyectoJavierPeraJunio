import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Noticias } from '../noticias/noticias';
import { NoticiaModel } from '../model/noticia.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.html',
  providers: [DatePipe],
  styleUrl: './admin.css',
})
export class Admin {


  titulo = '';
  descripcion = '';
  urlExterna = '';
  urlImagen = '';

 
  noticiaSeleccionadaEditar: NoticiaModel | null = null;
  editarTitulo = '';
  editarDescripcion = '';
  editarUrlExterna = '';
  editarFechaPublicacion = '';
  editarUrlImagen = '';

  noticiaSeleccionadaEliminar: NoticiaModel | null = null;


  noticias: NoticiaModel[] = [];
  ultimasNoticias: NoticiaModel[] = [];
  usuarios: any[] = [];

  mensaje = '';

  constructor() {
    this.cargarNoticias();
    this.cargarUsuarios();
    this.cargarUltimasNoticias();
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

  async cargarUltimasNoticias() {
    try {
      const res = await fetch('http://localhost:8080/api/noticias/ultimas');
      if (!res.ok) throw new Error('Error al obtener últimas noticias');
      this.ultimasNoticias = await res.json();
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudieron cargar las últimas noticias.';
    }
  }

  mostrarUltimasNoticias() {
    this.cargarUltimasNoticias();
  }

  async agregarNoticia() {
    if (!this.titulo || !this.descripcion) {
      this.mensaje = 'Título y descripción son obligatorios';
      return;
    }

    try {
      const nuevaNoticia = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        urlExterna: this.urlExterna,
        urlImagen: this.urlImagen,
        fechaPublicacion: new Date().toISOString()
      };

      const res = await fetch('http://localhost:8080/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaNoticia)
      });

      if (!res.ok) throw new Error('Error al agregar noticia');

      const noticiaAgregada: NoticiaModel = await res.json();
      this.noticias.unshift(noticiaAgregada);

      this.titulo = '';
      this.descripcion = '';
      this.urlExterna = '';
      this.urlImagen = '';
      this.mensaje = 'Noticia agregada con éxito!';
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo agregar la noticia.';
    }
  }

 seleccionarParaEditar(noticia: NoticiaModel | null) {
  if (!noticia) return;

  this.noticiaSeleccionadaEditar = noticia;
  this.editarTitulo = noticia.titulo;
  this.editarDescripcion = noticia.descripcion;
  this.editarUrlExterna = noticia.urlExterna;
  this.editarFechaPublicacion = noticia.fechaPublicacion?.split('T')[0] || '';
  this.editarUrlImagen = noticia.urlImagen || '';
}

  async editarNoticia() {
    if (!this.noticiaSeleccionadaEditar) return;

      try {
        const noticiaActualizada = {
          ...this.noticiaSeleccionadaEditar,
          titulo: this.editarTitulo,
          descripcion: this.editarDescripcion,
          urlExterna: this.editarUrlExterna,
          urlImagen: this.editarUrlImagen,
          fechaPublicacion: this.editarFechaPublicacion
        };

        const res = await fetch(`http://localhost:8080/api/noticias/${noticiaActualizada.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noticiaActualizada)
        });

        if (!res.ok) throw new Error('Error al editar noticia');

        const noticiaFromServer: NoticiaModel = await res.json();
        const index = this.noticias.findIndex(n => n.id === noticiaFromServer.id);
        if (index >= 0) this.noticias[index] = noticiaFromServer;

        this.noticiaSeleccionadaEditar = noticiaFromServer;

        this.mensaje = 'Noticia editada con éxito!';
      } catch (error) {
        console.error(error);
        this.mensaje = 'No se pudo editar la noticia.';
      }
  }

  async eliminarNoticia() {
    if (!this.noticiaSeleccionadaEliminar) {
      this.mensaje = 'Selecciona una noticia para eliminar';
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/noticias/${this.noticiaSeleccionadaEliminar.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Error al eliminar noticia');

      this.noticias = this.noticias.filter(n => n.id !== this.noticiaSeleccionadaEliminar!.id);
      this.noticiaSeleccionadaEliminar = null;
      this.mensaje = 'Noticia eliminada con éxito!';
    } catch (error) {
      console.error(error);
      this.mensaje = 'No se pudo eliminar la noticia.';
    }
  }
}
