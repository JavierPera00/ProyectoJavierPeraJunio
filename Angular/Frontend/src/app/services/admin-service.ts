import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoticiaModel } from '../model/noticia.model';
import { UsuarioModel } from '../model/usuario.model';
import { CursoModel } from '../model/curso.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiNoticias = 'http://localhost:8080/api/noticias';
  private apiUsuarios = 'http://localhost:8080/api/usuarios';
  private apiCursos = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}

  cargarNoticias(): Observable<NoticiaModel[]> {
    return this.http.get<NoticiaModel[]>(this.apiNoticias);
  }

  cargarUltimasNoticias(): Observable<NoticiaModel[]> {
    return this.http.get<NoticiaModel[]>(`${this.apiNoticias}/ultimas`);
  }

  agregarNoticia(noticia: Partial<NoticiaModel>): Observable<NoticiaModel> {
    return this.http.post<NoticiaModel>(this.apiNoticias, noticia);
  }

  editarNoticia(id: number, noticia: NoticiaModel): Observable<NoticiaModel> {
    return this.http.patch<NoticiaModel>(`${this.apiNoticias}/${id}`, noticia);
  }

  eliminarNoticia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiNoticias}/${id}`);
  }
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUsuarios}/${id}`);
  }
  cargarUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.apiUsuarios);
  }
  // Cursos
  cargarCursos(): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(`${this.apiCursos}`);
  }

  agregarCurso(curso: CursoModel): Observable<CursoModel> {
    return this.http.post<CursoModel>(`${this.apiCursos}`, curso);
  }

  editarCurso(id: number, curso: CursoModel): Observable<CursoModel> {
    return this.http.put<CursoModel>(`${this.apiCursos}/${id}`, curso);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCursos}/${id}`);
  }

  buscarUsuarioPorEmail(email: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUsuarios}/email/${email}`);
  }

  buscarUsuarioPorUsername(username: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUsuarios}/username/${username}`);
  }

  buscarCursoPorTitulo(titulo: string): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(`${this.apiCursos}/buscar?titulo=${titulo}`);
  }
}
