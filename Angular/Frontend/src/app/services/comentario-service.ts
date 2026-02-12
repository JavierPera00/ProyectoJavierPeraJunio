import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../comentario/comentario';
import { ComentarioModel } from '../model/comentarioModel';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8080/api/comentarios';

  constructor(private http: HttpClient) {}

  getComentarios(): Observable<ComentarioModel[]> {
    return this.http.get<ComentarioModel[]>(this.apiUrl);
  }

  crearComentario(comentario: ComentarioModel): Observable<ComentarioModel> {
    return this.http.post<ComentarioModel>(this.apiUrl, comentario);
  }
}
