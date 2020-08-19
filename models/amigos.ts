import conectarDB from "../db/index.ts";
import { AmigoSchema } from "../types/amigos.ts;
const db = conectarDB();

const amigo = db.collection<AmigoSchema>("amigo");

export default amigo;
