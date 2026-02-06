import { Routes } from '@angular/router';
import { Mapa } from './mapa/mapa';
import { Noticias } from './noticias/noticias';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Mapa },
  { path: 'mapa', component: Mapa },
  { path: 'noticias', component: Noticias },
  { path: '**', redirectTo: '/home' }
];
