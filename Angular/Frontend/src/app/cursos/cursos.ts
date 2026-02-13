import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/cursos-service';
import { CursoModel } from '../model/curso.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  imports: [FormsModule,CommonModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {

  cursos!: Observable< CursoModel[] > ;

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
   this.cursos= this.cursosService.cargarCursos();
   console.log(this.cursos);
  }

}
