import { Routes } from '@angular/router';
import { Mapa } from './mapa/mapa';
import { Noticias } from './noticias/noticias';
import { Login } from './login/login';
import { Home } from './home/home';
import { Registro } from './registro/registro';
import { Admin } from './admin/admin';

export const routes: Routes = [
  {path:"",component:Home},
  {path:"home",component:Home},
  {path:"noticias",component:Noticias},
  {path:"mapa",component:Mapa}, 
  {path:"login",component:Login}, 
  {path:"admin",component:Admin}, 
  {path:"registro",component:Registro}, 
  {path:"*",component:Home}
];
