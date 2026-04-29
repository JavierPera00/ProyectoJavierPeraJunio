import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NoticiaModel } from '../model/noticia.model';
import { NoticiasService } from '../services/noticiasService';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, AsyncPipe, HttpClientModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
  standalone: true,
})
export class Noticias implements OnInit {
  noticias!: Observable<NoticiaModel[]>;

  constructor(private servicio: NoticiasService) {}

  ngOnInit(): void {
    this.noticias = this.servicio
      .cargarNoticias()
      .pipe(
        map((noticias) =>
          noticias.sort(
            (a, b) =>
              new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
          ),
        ),
      );
  }
}
