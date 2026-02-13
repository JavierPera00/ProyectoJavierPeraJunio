import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoModel } from '../model/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiCursos = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}

  cargarCursos(): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(this.apiCursos);
  }
  agregarCurso(curso: CursoModel): Observable<CursoModel> {
    return this.http.post<CursoModel>(this.apiCursos, curso);
  }

  editarCurso(id: number, curso: CursoModel): Observable<CursoModel> {
    return this.http.put<CursoModel>(`${this.apiCursos}/${id}`, curso);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCursos}/${id}`);
  }
}
