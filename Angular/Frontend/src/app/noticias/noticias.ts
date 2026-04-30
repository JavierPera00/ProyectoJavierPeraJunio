import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoticiaModel } from '../model/noticia.model';
import { NoticiasService } from '../services/noticiasService';
import { map } from 'rxjs';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, AsyncPipe, HttpClientModule, FormsModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class Noticias implements OnInit {

  todasNoticias: NoticiaModel[] = [];
  noticiasFiltradas: NoticiaModel[] = [];

  filtroBusqueda = '';
  filtroMes = '';

  meses = [
    { valor: '01', nombre: 'Enero' },
    { valor: '02', nombre: 'Febrero' },
    { valor: '03', nombre: 'Marzo' },
    { valor: '04', nombre: 'Abril' },
    { valor: '05', nombre: 'Mayo' },
    { valor: '06', nombre: 'Junio' },
    { valor: '07', nombre: 'Julio' },
    { valor: '08', nombre: 'Agosto' },
    { valor: '09', nombre: 'Septiembre' },
    { valor: '10', nombre: 'Octubre' },
    { valor: '11', nombre: 'Noviembre' },
    { valor: '12', nombre: 'Diciembre' },
  ];

  constructor(private servicio: NoticiasService) {}

  ngOnInit(): void {
    this.servicio.cargarNoticias().pipe(
      map(n => n.sort((a, b) =>
        new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
      ))
    ).subscribe(data => {
      this.todasNoticias = data;
      this.noticiasFiltradas = data;
    });
  }

  filtrar() {
    let resultado = [...this.todasNoticias];

    if (this.filtroBusqueda.trim()) {
      const term = this.filtroBusqueda.toLowerCase();
      resultado = resultado.filter(n =>
        n.titulo.toLowerCase().includes(term) ||
        n.descripcion.toLowerCase().includes(term)
      );
    }

    if (this.filtroMes) {
      resultado = resultado.filter(n => {
        const mes = new Date(n.fechaPublicacion).getMonth() + 1;
        return mes === parseInt(this.filtroMes);
      });
    }

    this.noticiasFiltradas = resultado;
  }

  limpiarFiltros() {
    this.filtroBusqueda = '';
    this.filtroMes = '';
    this.noticiasFiltradas = [...this.todasNoticias];
  }
}
