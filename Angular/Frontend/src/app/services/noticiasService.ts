import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoticiaModel } from '../model/noticia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private apiUrl = 'http://localhost:8080/api/noticias';

  constructor(private http: HttpClient) {}

  cargarNoticias(): Observable<NoticiaModel[]> {
    return this.http.get<NoticiaModel[]>(this.apiUrl);
  }
}
