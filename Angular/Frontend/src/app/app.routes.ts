import { Routes } from '@angular/router';
import { Mapa } from './mapa/mapa';
import { Noticias } from './noticias/noticias';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { Perfil } from './perfil/perfil';
import { Cursos } from './cursos/cursos';
import { Sobre } from './sobre/sobre';
import { Contacto } from './contacto/contacto';
import { Test } from './test/test';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'noticias', component: Noticias },
  { path: 'mapa', component: Mapa },
  { path: 'perfil', component: Perfil },
  { path: 'adminn', component: Admin },
  { path: 'cursos', component: Cursos },
  { path: 'sobre', component: Sobre },
  { path: 'contacto', component: Contacto },
  { path: 'login', component: Login },
  { path: 'test', component: Test },
  { path: '**', component: Home },
];
