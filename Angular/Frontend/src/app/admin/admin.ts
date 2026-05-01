import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiaModel } from '../model/noticia.model';
import { AdminService } from '../services/admin-service';
import { Observable } from 'rxjs';
import { NoticiasService } from '../services/noticiasService';
import { HttpClientModule } from '@angular/common/http';
import { CursoModel } from '../model/curso.model';
import { UsuarioModel } from '../model/usuario.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, AsyncPipe, HttpClientModule],
  templateUrl: './admin.html',
  providers: [DatePipe],
  styleUrl: './admin.css',
  encapsulation: ViewEncapsulation.None,
})
export class Admin implements OnInit {
  noticias$!: Observable<NoticiaModel[]>;
  ultimasNoticias$!: Observable<NoticiaModel[]>;
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

  emailBusqueda = '';
  usernameBusqueda = '';
  usuarioEncontrado: UsuarioModel | null = null;
  tituloBusquedaCurso = '';
  cursosFiltrados: CursoModel[] = [];

  // FILTROS NOTICIAS
  filtroNoticiaNombre = '';
  filtroNoticiaDia = '';
  noticiasFiltradas: NoticiaModel[] = [];
  todasNoticias: NoticiaModel[] = [];

  // FILTROS CURSOS LISTADO
  filtroCursoNombre = '';
  cursosFiltradosLista: CursoModel[] = [];
  todosCursos: CursoModel[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
    this.cargarCursos();
  }

  cargarNoticias() {
    this.noticias$ = this.noticiasService.cargarNoticias();
    this.noticiasService.cargarNoticias().subscribe((data) => {
      this.todasNoticias = data.sort(
        (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
      );
      this.noticiasFiltradas = [...this.todasNoticias];
    });
  }

  cargarCursos() {
    this.cursos$ = this.adminService.cargarCursos();
    this.adminService.cargarCursos().subscribe((data) => {
      this.todosCursos = data;
      this.cursosFiltradosLista = [...data];
    });
  }

  filtrarNoticias() {
    let r = [...this.todasNoticias];
    if (this.filtroNoticiaNombre.trim()) {
      const t = this.filtroNoticiaNombre.toLowerCase();
      r = r.filter((n) => n.titulo.toLowerCase().includes(t));
    }
    if (this.filtroNoticiaDia) {
      r = r.filter((n) => {
        const fecha = new Date(n.fechaPublicacion).toISOString().split('T')[0];
        return fecha === this.filtroNoticiaDia;
      });
    }
    this.noticiasFiltradas = r;
  }

  limpiarFiltrosNoticias() {
    this.filtroNoticiaNombre = '';
    this.filtroNoticiaDia = '';
    this.noticiasFiltradas = [...this.todasNoticias];
  }

  filtrarCursosLista() {
    let r = [...this.todosCursos];
    if (this.filtroCursoNombre.trim()) {
      const t = this.filtroCursoNombre.toLowerCase();
      r = r.filter((c) => c.titulo.toLowerCase().includes(t));
    }
    this.cursosFiltradosLista = r;
  }

  limpiarFiltrosCursos() {
    this.filtroCursoNombre = '';
    this.cursosFiltradosLista = [...this.todosCursos];
  }

  mostrarUltimasNoticias() {
    this.ultimasNoticias$ = this.adminService.cargarUltimasNoticias();
  }

  agregarNoticia() {
    if (!this.titulo || !this.descripcion) {
      this.mensaje = 'Error — Título y descripción obligatorios';
      return;
    }
    const noticia = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      urlExterna: this.urlExterna,
      urlImagen: this.urlImagen,
      fechaPublicacion: new Date().toISOString(),
    };
    this.adminService.agregarNoticia(noticia).subscribe({
      next: () => {
        this.mensaje = 'Noticia publicada correctamente';
        this.cargarNoticias();
        this.titulo = '';
        this.descripcion = '';
        this.urlExterna = '';
        this.urlImagen = '';
      },
      error: () => (this.mensaje = 'Error al publicar la noticia'),
    });
  }

  eliminarNoticia(id: number) {
    if (!confirm('¿Eliminar esta noticia?')) return;
    this.adminService.eliminarNoticia(id).subscribe({
      next: () => {
        this.mensaje = 'Noticia eliminada';
        this.cargarNoticias();
      },
      error: () => (this.mensaje = 'Error al eliminar la noticia'),
    });
  }

  agregarCurso() {
    if (!this.cursoTitulo || !this.cursoDescripcion || !this.cursoDuracion || !this.cursoUrl) {
      this.mensaje = 'Error — Todos los campos son obligatorios';
      return;
    }
    const curso: CursoModel = {
      titulo: this.cursoTitulo,
      descripcion: this.cursoDescripcion,
      duracion: this.cursoDuracion,
      imagenUrl: this.cursoImagenUrl,
      url: this.cursoUrl,
    };
    this.adminService.agregarCurso(curso).subscribe({
      next: () => {
        this.mensaje = 'Curso agregado correctamente';
        this.limpiarFormularioCurso();
        this.cargarCursos();
      },
      error: () => (this.mensaje = 'Error al agregar el curso'),
    });
  }

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
      url: this.cursoUrl,
    };
    this.adminService.editarCurso(this.cursoEditarId, curso).subscribe({
      next: () => {
        this.mensaje = 'Curso actualizado';
        this.limpiarFormularioCurso();
        this.cargarCursos();
      },
      error: () => (this.mensaje = 'Error al actualizar el curso'),
    });
  }

  eliminarCurso(id: number) {
    if (!confirm('¿Eliminar este curso?')) return;
    this.adminService.eliminarCurso(id).subscribe({
      next: () => {
        this.mensaje = 'Curso eliminado';
        this.cargarCursos();
      },
      error: () => (this.mensaje = 'Error al eliminar el curso'),
    });
  }

  limpiarFormularioCurso() {
    this.cursoTitulo = '';
    this.cursoDescripcion = '';
    this.cursoDuracion = '';
    this.cursoImagenUrl = '';
    this.cursoUrl = '';
    this.cursoEditarId = null;
  }

  buscarCursoPorTitulo() {
    if (!this.tituloBusquedaCurso) return;
    this.adminService
      .buscarCursoPorTitulo(this.tituloBusquedaCurso)
      .subscribe((data) => (this.cursosFiltrados = data));
  }
}
