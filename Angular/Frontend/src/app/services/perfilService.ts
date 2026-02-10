import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {

  private apiUsuarios = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener usuario por ID (opcional)
  getUsuario(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUsuarios}/${id}`);
  }

  // Actualizar usuario existente
  actualizarUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    if (!usuario.id) {
      throw new Error('No se puede actualizar un usuario sin ID');
    }
    return this.http.put<UsuarioModel>(
      `${this.apiUsuarios}/${usuario.id}`,
      usuario
    );
  }
}