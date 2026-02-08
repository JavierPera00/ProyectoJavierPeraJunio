import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NoticiaModel } from '../model/noticia.model';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit{

  noticias: NoticiaModel[] = [];

  private apiUrl = 'http://localhost:8080/api/noticias/ultimas';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }
  cargarNoticias(): void {
    this.http.get<NoticiaModel[]>(this.apiUrl).subscribe({
      next: data => this.noticias = data,
      error: err => console.error('Error cargando noticias', err)
    });
  }
}
