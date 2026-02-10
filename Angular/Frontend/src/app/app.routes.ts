import { Routes } from '@angular/router';
import { Mapa } from './mapa/mapa';
import { Noticias } from './noticias/noticias';
import { Login } from './login/login';
import { Home } from './home/home';
import { Registro } from './registro/registro';
import { Admin } from './admin/admin';
import { Perfil } from './perfil/perfil';
import { Cursos } from './cursos/cursos';

export const routes: Routes = [
  {path:"",component:Home},
  {path:"home",component:Home},
  {path:"noticias",component:Noticias},
  {path:"mapa",component:Mapa},
  {path:"perfil",component:Perfil}, 
  {path:"login",component:Login}, 
  {path:"adminn",component:Admin}, 
  {path:"registro",component:Registro}, 
  {path:"cursos",component:Cursos}, 
  {path:"**",component:Home}
];
