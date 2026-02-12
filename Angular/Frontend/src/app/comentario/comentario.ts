import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComentarioService } from '../services/comentario-service';
import { Observable } from 'rxjs/internal/Observable';
import { ComentarioModel } from '../model/comentarioModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentario',
  imports: [FormsModule,CommonModule],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css',
})
export class Comentario implements OnInit{

  @Output() cerrarComentarios = new EventEmitter<void>();

  comentarios$!: Observable<ComentarioModel[]>;
  nuevoComentario = '';
  usuarioNombre = 'anónimo';

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit() {
    const u = localStorage.getItem('usuarioLogueado');
    if (u) {
      try {
        this.usuarioNombre = JSON.parse(u).username || 'anónimo';
      } catch {
        this.usuarioNombre = 'anónimo';
      }
    }

    this.cargarComentarios();
  }

  cerrar() {
    this.cerrarComentarios.emit();
  }

  cargarComentarios() {
    this.comentarios$ = this.comentarioService.getComentarios();
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim()) return;

    const comentario: ComentarioModel = {
      texto: this.nuevoComentario,
      usuario: { username: this.usuarioNombre },
    };

    this.comentarioService.crearComentario(comentario).subscribe(() => {
      this.nuevoComentario = '';
      this.cargarComentarios();
    });
  }
}