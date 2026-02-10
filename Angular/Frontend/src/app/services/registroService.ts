import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}
  registrar(usuario: UsuarioModel): Observable<UsuarioModel> {
    const usuarioEnviar = {
      username: usuario.username,
      email: usuario.email,
      password: usuario.password
    };
    return this.http.post<UsuarioModel>(this.apiUrl, usuarioEnviar);
  }
}
