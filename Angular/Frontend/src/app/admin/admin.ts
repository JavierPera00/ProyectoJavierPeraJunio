import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Noticias } from '../noticias/noticias';
import { NoticiaModel } from '../model/noticia.model';
import { AdminService } from '../services/admin-service';
import { map, Observable } from 'rxjs';
import { NoticiasService } from '../services/noticiasService';
import { HttpClientModule } from '@angular/common/http';
import id from '@angular/common/locales/extra/id';
import { CursoModel } from '../model/curso.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule,CommonModule, AsyncPipe,HttpClientModule],
  templateUrl: './admin.html',
  providers: [DatePipe],
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  noticias$!: Observable<NoticiaModel[]>;
  ultimasNoticias$!: Observable<NoticiaModel[]>;
  usuarios$!: Observable<any[]>;
  cursos$!: Observable<CursoModel[]>;

  titulo = '';
  descripcion = '';
  urlExterna = '';
  urlImagen = '';
  mensaje = '';

  cursoTitulo = '';
  cursoDescripcion = '';
  cursoDuracion = '';
  cursoImagenUrl = '';
  cursoUrl = '';

  cursoEditarId: number | null = null;

  constructor(
    private noticiasService: NoticiasService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
    this.cargarUsuarios();
    this.cargarCursos();   
  }

  cargarNoticias() {
    this.noticias$ = this.noticiasService.cargarNoticias();
  }

  cargarUsuarios() {
    this.usuarios$ = this.adminService.cargarUsuarios();
    console.log(this.usuarios$);
  }

  mostrarUltimasNoticias() {
    this.ultimasNoticias$ = this.adminService.cargarUltimasNoticias();
  }

  agregarNoticia() {
    if (!this.titulo || !this.descripcion) {
      this.mensaje = 'Título y descripción obligatorios';
      return;
    }
    const noticia = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      urlExterna: this.urlExterna,
      urlImagen: this.urlImagen,
      fechaPublicacion: new Date().toISOString()
    };
    this.adminService.agregarNoticia(noticia).subscribe({
      next: () => {
        this.mensaje = 'Noticia agregada';
        this.cargarNoticias();
        this.titulo = '';
        this.descripcion = '';
        this.urlExterna = '';
        this.urlImagen = '';
      },
      error: () => this.mensaje = 'Error al agregar noticia'
    });
  }

  eliminarNoticia(id: number) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      return;
    }
    this.adminService.eliminarNoticia(id).subscribe({
      next: () => {
        this.mensaje = 'Noticia eliminada correctamente';
        this.cargarNoticias();
      },
      error: () => {
        this.mensaje = 'Error al eliminar la noticia';
      }
    });
  }

  eliminarUsuario(id: number) {
      if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        return;
      }
      this.adminService.eliminarUsuario(id).subscribe({
        next: () => {
          this.mensaje = 'Usuario eliminado correctamente';
          this.cargarUsuarios(); 
        },
        error: () => {
          this.mensaje = 'Error al eliminar el usuario';
        }
      });
    }

    cargarCursos() {
  this.cursos$ = this.adminService.cargarCursos();
}

// Crear curso
agregarCurso() {
  if (!this.cursoTitulo || !this.cursoDescripcion || !this.cursoDuracion || !this.cursoUrl) {
    this.mensaje = 'Todos los campos obligatorios';
    return;
  }
  const curso: CursoModel = {
    titulo: this.cursoTitulo,
    descripcion: this.cursoDescripcion,
    duracion: this.cursoDuracion,
    imagenUrl: this.cursoImagenUrl,
    url: this.cursoUrl
  };
  this.adminService.agregarCurso(curso).subscribe({
    next: () => {
      this.mensaje = 'Curso agregado';
      this.limpiarFormularioCurso();
      this.cargarCursos();
    },
    error: () => this.mensaje = 'Error al agregar curso'
  });
}

// Editar curso
cargarCursoParaEditar(curso: CursoModel) {
  this.cursoEditarId = curso.id!;
  this.cursoTitulo = curso.titulo;
  this.cursoDescripcion = curso.descripcion;
  this.cursoDuracion = curso.duracion;
  this.cursoImagenUrl = curso.imagenUrl!;
  this.cursoUrl = curso.url;
}

editarCurso() {
  if (!this.cursoEditarId) return;

  const curso: CursoModel = {
    titulo: this.cursoTitulo,
    descripcion: this.cursoDescripcion,
    duracion: this.cursoDuracion,
    imagenUrl: this.cursoImagenUrl,
    url: this.cursoUrl
  };

  this.adminService.editarCurso(this.cursoEditarId, curso).subscribe({
    next: () => {
      this.mensaje = 'Curso actualizado';
      this.limpiarFormularioCurso();
      this.cursoEditarId = null;
      this.cargarCursos();
    },
    error: () => this.mensaje = 'Error al actualizar curso'
  });
}

// Eliminar curso
eliminarCurso(id: number) {
  if (!confirm('¿Eliminar curso?')) return;

  this.adminService.eliminarCurso(id).subscribe({
    next: () => {
      this.mensaje = 'Curso eliminado';
      this.cargarCursos();
    },
    error: () => this.mensaje = 'Error al eliminar curso'
  });
}

// Limpiar formulario
limpiarFormularioCurso() {
  this.cursoTitulo = '';
  this.cursoDescripcion = '';
  this.cursoDuracion = '';
  this.cursoImagenUrl = '';
  this.cursoUrl = '';
  this.cursoEditarId = null;
}
}

