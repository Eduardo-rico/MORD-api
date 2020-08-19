export interface UsuarioSchema {
  _id: { "$oid": string };
  nombre: string;
  password: string;
  amigos?: string[];
}
