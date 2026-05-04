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
import { ContactoService, Contacto } from '../services/contacto-service';

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

  filtroNoticiaNombre = '';
  filtroNoticiaDia = '';
  noticiasFiltradas: NoticiaModel[] = [];
  todasNoticias: NoticiaModel[] = [];

  filtroCursoNombre = '';
  cursosFiltradosLista: CursoModel[] = [];
  todosCursos: CursoModel[] = [];

  mensajes: Contacto[] = [];
  mensajesFiltrados: Contacto[] = [];
  filtroMensajeNombre = '';
  mensajeAbierto: Contacto | null = null;

  private readonly contactoSvc: ContactoService;

  constructor(
    private noticiasService: NoticiasService,
    private adminService: AdminService,
    contactoService: ContactoService,
  ) {
    this.contactoSvc = contactoService;
  }

  ngOnInit(): void {
    this.cargarNoticias();
    this.cargarCursos();
    this.cargarMensajes();
  }

  cargarNoticias(): void {
    this.noticias$ = this.noticiasService.cargarNoticias();
    this.noticiasService.cargarNoticias().subscribe((data: NoticiaModel[]) => {
      this.todasNoticias = data.sort(
        (a: NoticiaModel, b: NoticiaModel) =>
          new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
      );
      this.noticiasFiltradas = [...this.todasNoticias];
    });
  }

  cargarCursos(): void {
    this.cursos$ = this.adminService.cargarCursos();
    this.adminService.cargarCursos().subscribe((data: CursoModel[]) => {
      this.todosCursos = data;
      this.cursosFiltradosLista = [...data];
    });
  }

  cargarMensajes(): void {
    this.contactoSvc.cargarMensajes().subscribe((data: Contacto[]) => {
      this.mensajes = data.sort((a: Contacto, b: Contacto) => {
        if (!a.fecha || !b.fecha) return 0;
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      });
      this.mensajesFiltrados = [...this.mensajes];
    });
  }

  filtrarNoticias(): void {
    let r = [...this.todasNoticias];
    if (this.filtroNoticiaNombre.trim()) {
      const t = this.filtroNoticiaNombre.toLowerCase();
      r = r.filter((n: NoticiaModel) => n.titulo.toLowerCase().includes(t));
    }
    if (this.filtroNoticiaDia) {
      r = r.filter((n: NoticiaModel) => {
        const fecha = new Date(n.fechaPublicacion).toISOString().split('T')[0];
        return fecha === this.filtroNoticiaDia;
      });
    }
    this.noticiasFiltradas = r;
  }

  limpiarFiltrosNoticias(): void {
    this.filtroNoticiaNombre = '';
    this.filtroNoticiaDia = '';
    this.noticiasFiltradas = [...this.todasNoticias];
  }

  filtrarCursosLista(): void {
    let r = [...this.todosCursos];
    if (this.filtroCursoNombre.trim()) {
      const t = this.filtroCursoNombre.toLowerCase();
      r = r.filter((c: CursoModel) => c.titulo.toLowerCase().includes(t));
    }
    this.cursosFiltradosLista = r;
  }

  limpiarFiltrosCursos(): void {
    this.filtroCursoNombre = '';
    this.cursosFiltradosLista = [...this.todosCursos];
  }

  filtrarMensajes(): void {
    const t = this.filtroMensajeNombre.toLowerCase();
    this.mensajesFiltrados = this.mensajes.filter((m: Contacto) =>
      m.nombre.toLowerCase().includes(t) ||
      m.email.toLowerCase().includes(t) ||
      m.asunto.toLowerCase().includes(t)
    );
  }

  limpiarFiltrosMensajes(): void {
    this.filtroMensajeNombre = '';
    this.mensajesFiltrados = [...this.mensajes];
  }

  abrirMensaje(m: Contacto): void {
    this.mensajeAbierto = m;
  }

  cerrarMensaje(): void {
    this.mensajeAbierto = null;
  }

  eliminarMensaje(id: number): void {
    if (!confirm('¿Eliminar este mensaje?')) return;
    this.contactoSvc.eliminarMensaje(id).subscribe({
      next: () => { this.mensaje = 'Mensaje eliminado'; this.cargarMensajes(); },
      error: () => (this.mensaje = 'Error al eliminar el mensaje'),
    });
  }

  mostrarUltimasNoticias(): void {
    this.ultimasNoticias$ = this.adminService.cargarUltimasNoticias();
  }

  agregarNoticia(): void {
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

  eliminarNoticia(id: number): void {
    if (!confirm('¿Eliminar esta noticia?')) return;
    this.adminService.eliminarNoticia(id).subscribe({
      next: () => { this.mensaje = 'Noticia eliminada'; this.cargarNoticias(); },
      error: () => (this.mensaje = 'Error al eliminar la noticia'),
    });
  }

  agregarCurso(): void {
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
      next: () => { this.mensaje = 'Curso agregado correctamente'; this.limpiarFormularioCurso(); this.cargarCursos(); },
      error: () => (this.mensaje = 'Error al agregar el curso'),
    });
  }

  cargarCursoParaEditar(curso: CursoModel): void {
    this.cursoEditarId = curso.id!;
    this.cursoTitulo = curso.titulo;
    this.cursoDescripcion = curso.descripcion;
    this.cursoDuracion = curso.duracion;
    this.cursoImagenUrl = curso.imagenUrl!;
    this.cursoUrl = curso.url;
  }

  editarCurso(): void {
    if (!this.cursoEditarId) return;
    const curso: CursoModel = {
      titulo: this.cursoTitulo,
      descripcion: this.cursoDescripcion,
      duracion: this.cursoDuracion,
      imagenUrl: this.cursoImagenUrl,
      url: this.cursoUrl,
    };
    this.adminService.editarCurso(this.cursoEditarId, curso).subscribe({
      next: () => { this.mensaje = 'Curso actualizado'; this.limpiarFormularioCurso(); this.cargarCursos(); },
      error: () => (this.mensaje = 'Error al actualizar el curso'),
    });
  }

  eliminarCurso(id: number): void {
    if (!confirm('¿Eliminar este curso?')) return;
    this.adminService.eliminarCurso(id).subscribe({
      next: () => { this.mensaje = 'Curso eliminado'; this.cargarCursos(); },
      error: () => (this.mensaje = 'Error al eliminar el curso'),
    });
  }

  limpiarFormularioCurso(): void {
    this.cursoTitulo = '';
    this.cursoDescripcion = '';
    this.cursoDuracion = '';
    this.cursoImagenUrl = '';
    this.cursoUrl = '';
    this.cursoEditarId = null;
  }

  buscarCursoPorTitulo(): void {
    if (!this.tituloBusquedaCurso) return;
    this.adminService
      .buscarCursoPorTitulo(this.tituloBusquedaCurso)
      .subscribe((data: CursoModel[]) => (this.cursosFiltrados = data));
  }
}
