import conectarDB from "../db/index.ts";
import { UsuarioSchema } from "../types/usuario.ts";
const db = conectarDB();

const usuario = db.collection<UsuarioSchema>("usuario");

export default usuario;
