
export interface RolModel {
  id?: number;
  nombre: string;
}

export interface UsuarioModel {
  id?: number;
  username: string;
  email: string;
  rol?: RolModel;
  password?: string; 
}