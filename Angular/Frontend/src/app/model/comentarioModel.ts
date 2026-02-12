export interface ComentarioModel {
  id?: number;
  texto: string;    
  usuario: {
    username: string;
  };
  fecha?: string;
}