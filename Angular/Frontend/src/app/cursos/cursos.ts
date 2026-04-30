import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CursosService } from '../services/cursos-service';
import { CursoModel } from '../model/curso.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  imports: [FormsModule, CommonModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
  encapsulation: ViewEncapsulation.None
})
export class Cursos implements OnInit {

  todosCursos: CursoModel[] = [];
  cursosFiltrados: CursoModel[] = [];

  filtroBusqueda = '';
  filtroHoras = '';

  horasOpciones: string[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.cargarCursos().subscribe(data => {
      this.todosCursos = data;
      this.cursosFiltrados = data;
      this.generarOpcionesHoras(data);
    });
  }

  generarOpcionesHoras(cursos: CursoModel[]) {
    const horas = new Set(cursos.map(c => c.duracion).filter(Boolean));
    this.horasOpciones = Array.from(horas).sort();
  }

  filtrar() {
    let resultado = [...this.todosCursos];

    if (this.filtroBusqueda.trim()) {
      const term = this.filtroBusqueda.toLowerCase();
      resultado = resultado.filter(c =>
        c.titulo.toLowerCase().includes(term) ||
        c.descripcion.toLowerCase().includes(term)
      );
    }

    if (this.filtroHoras) {
      resultado = resultado.filter(c => c.duracion === this.filtroHoras);
    }

    this.cursosFiltrados = resultado;
  }

  limpiarFiltros() {
    this.filtroBusqueda = '';
    this.filtroHoras = '';
    this.cursosFiltrados = [...this.todosCursos];
  }
}
